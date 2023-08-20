package org.lamisplus.modules.backup.service;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.SystemUtils;
import org.lamisplus.modules.backup.utility.ConstantUtility;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@Service
public class BackupServiceImpl implements BackupService {
    private final JdbcTemplate jdbcTemplate;
    private final ResourceLoader resourceLoader;

    @Value("${spring.datasource.username}")
    private String userName;
    @Value("${spring.datasource.password}")
    private String passWord;
    @Value("${spring.datasource.url}")
    private String dbUrl;

    private static final String UPLOADED_BACKUP_NAME = "uploaded_backup_";
    private static final String BACKUP_NAME = "backup_";
    private static final String PASS_WORD = "password";
    private static final String PG_PASSWORD = "PGPASSWORD";
    private static final String IP_ADDRESS = "ipAddress";
    private static final String USER_NAME = "username";
    private static final String DATABASE = "database";
    private static final String PORT = "port";
    SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHH");
    SimpleDateFormat alternateDf = new SimpleDateFormat("yyyyMMdd");

    public BackupServiceImpl(JdbcTemplate jdbcTemplate, ResourceLoader resourceLoader) {
        this.jdbcTemplate = jdbcTemplate;
        this.resourceLoader = resourceLoader;
    }

    /**
     * import backup file from external source
     * @param file multipart file to import
     */
    public void upload(MultipartFile file) {
        String directory = ConstantUtility.BACKUP_BASE_DIR;
        Date date1 = new Date();
        String fileName = UPLOADED_BACKUP_NAME + df.format(date1) + ".sql";
        try {
            file.transferTo(new File(directory + fileName));
            log.info("File uploaded successfully: {}", fileName);
        } catch (IOException exception) {
            log.error("Error uploading file: {}", exception.getMessage());
        }
    }

    /**
     *  copy database backup by name to ByteArrayOutputStream for download
     * @return ByteArrayOutputStream
     */
    public ByteArrayOutputStream downloadBackup(String databaseName) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        String directory = ConstantUtility.BACKUP_BASE_DIR;
        try {
            Optional<String> file = listFilesUsingDirectoryStream(directory).stream()
                    .filter(f -> f.equals(databaseName))
                    .limit(1)
                    .findFirst();

            file.ifPresent(s -> copyDatabaseBackup(baos, s));
        } catch (NoSuchElementException exception) {
            exception.printStackTrace();
        }

        return baos;
    }

    /**
     *  transfer pg libraries to
     * @param byteArrayOutputStream temporary storage for the file
     * @param fileName name of the file
     */
    private void copyDatabaseBackup(ByteArrayOutputStream byteArrayOutputStream, String fileName) {
        try(InputStream inputStream = Files.newInputStream(Paths.get(ConstantUtility.BACKUP_BASE_DIR + fileName))) {

            IOUtils.copy(inputStream, byteArrayOutputStream);
        } catch (IOException exception) {
            log.error("Error copying backup libraries: {}", exception.getMessage());
        }
    }

    /**
     *  backup the PostgreSQL database
     * @param restore if set to true, create a backup with filename restore
     */
    public int backupPGSQL(boolean restore) {
        int exitCode = -1;
        try {
            log.info("Backup started");
            initPgBackup();
            String directory = ConstantUtility.BACKUP_BASE_DIR;
            String pgFileDir = ConstantUtility.BASE_DIR + File.separator + "pg";
            Map<String, String> mapper = getDatabaseProperties();
            ProcessBuilder processBuilder;
            StringBuilder date = new StringBuilder();
            date.append(df.format(new Date()));
            File file = new File(directory);

            if (file.exists()) {
                log.info("Creating dump");
                String exec = "pg_dump";
                if (SystemUtils.IS_OS_WINDOWS) {
                    exec = pgFileDir + File.separator + exec + ".exe";
                }
                String buffer = directory + BACKUP_NAME + date + ".sql";
                if (restore) {
                    buffer = "restore.sql";
                }
                processBuilder = new ProcessBuilder(exec, "-f", buffer,
                        "-F", "c", "-Z", "9", "-b", "-v", "-c", "-C", "-p", mapper.get(PORT), "-h",
                        mapper.get(IP_ADDRESS), "-U", mapper.get(USER_NAME), mapper.get(DATABASE));

                processBuilder.environment().put(PG_PASSWORD, mapper.get(PASS_WORD));
                processBuilder.redirectErrorStream(true);
                exitCode = dataProcessor(processBuilder);
            }
        } catch (Exception x) {
            x.printStackTrace();
            log.error("catch error: {}", x.getMessage());
        }

        return exitCode;
    }

    /**
     *  restore PostgreSQL database by filename
     * @param fileName of the database backup
     */
    public int restorePGSQL(String fileName) {
        backupPGSQL(true);
        int exitCode = -1;
        try {
            log.info("Restore started");
            createSchema();
            String directory = ConstantUtility.BACKUP_BASE_DIR;
            String pgFileDir = ConstantUtility.BASE_DIR + File.separator + "pg";
            Map<String, String> mapper = getDatabaseProperties();
            ProcessBuilder processBuilder;
            String exec = "pg_restore";
            Optional<String> file = listFilesUsingDirectoryStream(directory).stream()
                    .filter(f -> f.equals(fileName))
                    .limit(1)
                    .findFirst();

            if (file.isPresent()) {
                try {
                    if (SystemUtils.IS_OS_WINDOWS) {
                        exec = pgFileDir + File.separator + exec + ".exe";
                    }
                    processBuilder = new ProcessBuilder(exec,
                            "-F", "c", "-c", "-C", "-v", "-p", mapper.get(PORT), "-h", mapper.get(IP_ADDRESS),
                            "-U", mapper.get(USER_NAME), "-d", mapper.get(DATABASE), directory + fileName.trim()
                    );
                    processBuilder.environment().put(PG_PASSWORD, mapper.get(PASS_WORD));
                    processBuilder.redirectErrorStream(true);

                    exitCode = dataProcessor(processBuilder);
                } catch (Exception exception) {
                    log.error("Error during database restore: {}", exception.getMessage());
                    exception.printStackTrace();
                }
            } else {
                log.info("Restore file not found.");
            }
        } catch (IOException exception) {
            log.error("An error occurred: {} ", exception.getMessage());
        }

        return exitCode;
    }

    /**
     * This method create a schema if not exists.
     */
    private void createSchema() {
        try {
            jdbcTemplate.execute("drop schema if exists public cascade; create schema public;");
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
    }

    /**
     *
     * @param processBuilder of the process to execute
     * @return PostgreSQL utility exit code for the process (backup or restore).
     */
    private int dataProcessor(ProcessBuilder processBuilder) {
        int exitCode = 0;
        try {
            Process process = processBuilder.start();
            try (BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                int counter = 0;
                while ((line = br.readLine()) != null) {
                    counter++;
                   log.info("Process Output Line {}: {}", counter, line);
                }
            }
            exitCode = process.waitFor();
            process.destroy();
        } catch (IOException | InterruptedException exception) {
            log.error("Error processing the file: {}", exception.getMessage());
            exception.printStackTrace();
        }

        return exitCode;
    }

    /**
     *  get list of files in the backup directory
     * @return List<String>
     */
    @SneakyThrows
    public List<String> backupAvailable() {
        String directory = ConstantUtility.BACKUP_BASE_DIR;
        return listFilesUsingDirectoryStream(directory).stream().sorted(Comparator.reverseOrder()).collect(Collectors.toList());
    }

    /**
     *  get list of files in a directory
     * @param dir directory to search for files
     * @return Set<String>
     * @throws IOException if an exception occurred.
     */
    private Set<String> listFilesUsingDirectoryStream(String dir) throws IOException {
        Set<String> fileList = new HashSet<>();
        try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(dir))) {
            for (Path path : stream) {
                if (!Files.isDirectory(path)) {
                    fileList.add(path.getFileName().toString());
                }
            }
        }
        return fileList;
    }

    /**
     *  clean up backup directory
     */
    @SneakyThrows
    public void cleanupBackup() {
        String directory = ConstantUtility.BACKUP_BASE_DIR;
        listFilesUsingDirectoryStream(directory).stream()
                .filter(f -> f.endsWith(".sql"))
                .forEach(f -> {
                    try {
                        Date date;
                        String backupName;
                        if (f.contains(UPLOADED_BACKUP_NAME)) {
                            backupName = f.replace(UPLOADED_BACKUP_NAME, "");
                        } else {
                            backupName = f.replace(BACKUP_NAME, "");
                        }
                        try {
                            date = df.parse(backupName.replace(".sql", ""));
                        } catch (ParseException e) {
                            date = alternateDf.parse(backupName.replace(".sql", ""));
                        }
                        if (LocalDateTime.now().minusDays(5).isAfter(convertToLocalDateTimeViaSqlTimestamp(date))) {
                            FileUtils.deleteQuietly(new File(directory + f));
                        }

                        if (LocalDateTime.now().minusHours(2).isAfter(convertToLocalDateTimeViaSqlTimestamp(date)) &&
                                LocalDateTime.now().toLocalDate().equals(convertToLocalDateTimeViaSqlTimestamp(date).toLocalDate())) {
                            FileUtils.deleteQuietly(new File(directory + f));
                        }
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                });
    }

    /**
     *  get database properties
     * @return Map<String, String>
     */
    private Map<String, String> getDatabaseProperties() {
        int index = dbUrl.indexOf("//") + 2;
        int index2 = dbUrl.lastIndexOf(":");
        int lastIndex = dbUrl.lastIndexOf("/") + 1;
        String dbase = dbUrl.substring(lastIndex);
        if (dbUrl.contains("?")) {
            int index3 = dbUrl.indexOf("?");
            dbase = dbUrl.substring(lastIndex, index3);
        }

        String ipAddress = dbUrl.substring(index, index2);
        String port = dbUrl.substring(index2 + 1, lastIndex - 1);
        Map<String, String> mapper = new HashMap<>();
        mapper.put(IP_ADDRESS, ipAddress);
        mapper.put(USER_NAME, userName);
        mapper.put(DATABASE, dbase);
        mapper.put(PASS_WORD, passWord);
        mapper.put(PORT, port);

        return mapper;
    }

    /**
     *  schedule a database auto-backup
     */
    @Scheduled(cron = "0 0 * * * ?")
    public void backupCleanup() {
        try {
            Thread.sleep(1000);
            backupPGSQL(false);
            cleanupBackup();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

    /**
     *  convert date to timestamp
     * @param dateToConvert to convert to timestamp
     * @return LocalDateTime
     */
    private LocalDateTime convertToLocalDateTimeViaSqlTimestamp(Date dateToConvert) {
        return new Timestamp(dateToConvert.getTime()).toLocalDateTime();
    }


    /**
     *  transfer PostgreSQL libraries to a directory
     */
    public void initPgBackup() {
        String pgFileDir = ConstantUtility.BASE_DIR + File.separator + "pg";
        new File(pgFileDir).mkdir();
        new File(ConstantUtility.BACKUP_BASE_DIR).mkdir();
        File pgDir = new File(pgFileDir);
        File backupDir = new File(ConstantUtility.BACKUP_BASE_DIR);
        if ( pgDir.exists() && backupDir.exists()) {
            String[] files = {"pg_dump.exe", "pg_restore.exe", "libcrypto-1_1-x64.dll",
                    "libpq.dll", "libssl-1_1-x64.dll", "libwinpthread-1.dll", "zlib1.dll", "libiconv-2.dll", "libintl-9.dll"};
            log.info("Writing");
            for (String file : files) {
                String fileInputName = "lib" + File.separator + file;
                Resource resource = resourceLoader.getResource("classpath:" + fileInputName);
                try (InputStream is = resource.getInputStream();//BackupServiceImpl.class.getClassLoader().getResourceAsStream(fileInputName);
                     FileOutputStream fos = new FileOutputStream(pgFileDir + File.separator + file)) {
                     if (is != null) {
                         log.info("Copying file; {}", file);
                         IOUtils.copyLarge(is, fos);
                     } else {
                         log.error("Error copying file. something went wrong filename: {}",fileInputName);
                     }
                } catch (IOException e) {
                    log.info("Error message: {}", e.getMessage());
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     *  get file extension
     * @param filePath of the file to get extension
     * @return String
     */
    public String getFileExtension(String filePath) {
        String fileName = new File(filePath).getName();
        int dotIndex = fileName.lastIndexOf('.');

        return (dotIndex == -1) ? "" : fileName.substring(dotIndex + 1);
    }

}
