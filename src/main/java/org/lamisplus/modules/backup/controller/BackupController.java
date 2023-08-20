package org.lamisplus.modules.backup.controller;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.backup.service.BackupService;
import org.lamisplus.modules.backup.utility.ConstantUtility;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/database")
public class BackupController {
    private final BackupService backupService;

    public BackupController(BackupService backupService) {
        this.backupService = backupService;
    }

    @GetMapping("/backup")
    public ResponseEntity<String> backup() {
        try {
            int exitCode = backupService.backupPGSQL(false);
            if (exitCode == 0) {
                log.info("Database backup completed successfully.");
                return new ResponseEntity<>("Database backup completed successfully.", HttpStatus.OK);
            } else if (exitCode > 0 && exitCode < 3) {
                log.warn("Database backup completed with warnings. Exit code: {}", exitCode);
                return new ResponseEntity<>("Database backup completed with warnings. Exit code: " + exitCode, HttpStatus.OK);
            } else {
                log.error("Database backup failed. Exit code: {}", exitCode);
                return new ResponseEntity<>("Database backup failed. Exit code: " + exitCode, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Oops! Invalid request.", HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) throws IOException {
        try {
            backupService.upload(file);

            return new ResponseEntity<>("Uploaded the file successfully: " + file.getOriginalFilename(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Could not upload the file: " + file.getOriginalFilename(), HttpStatus.EXPECTATION_FAILED);
        }
    }

    @GetMapping("/restore/{fileName}")
    public ResponseEntity<String> restore(@PathVariable String fileName) {
        try {
            if (!backupService.getFileExtension(fileName).equalsIgnoreCase("sql")
                    || fileName == null || !fileName.contains(".sql")) {
                return new ResponseEntity<>("Invalid request: " + fileName, HttpStatus.BAD_REQUEST);
            }
            int exitCode = backupService.restorePGSQL(fileName);
            if (exitCode == 0) {
                log.info("Database restored successfully.");
                return new ResponseEntity<>("Database restored successfully.", HttpStatus.OK);
            } else if (exitCode > 0 && exitCode < 3) {
                log.warn("Database restore completed with warnings. Exit code: {}", exitCode);
                return new ResponseEntity<>("Database restore completed with warnings. Exit code: " + exitCode, HttpStatus.OK);
            } else {
                log.error("Database restore failed. Exit code: {}", exitCode);
                return new ResponseEntity<>("Database restore failed. Exit code: " + exitCode, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } catch (Exception e) {
            return new ResponseEntity<>("Database restored failed.", HttpStatus.EXPECTATION_FAILED);
        }

    }

    @GetMapping("/download/{filename}")
    public void downloadBackup(HttpServletResponse response, @PathVariable String filename) throws IOException {
        String message;
        try {
            if (!backupService.getFileExtension(filename).equalsIgnoreCase("sql") || filename == null) {
                throw  new IllegalArgumentException("Invalid request: " + filename);
            }
            ByteArrayOutputStream byteArrayOutputStream = backupService.downloadBackup(filename);
            if (byteArrayOutputStream.size() > 10000) {
                fileDownloader(response, byteArrayOutputStream);
                log.info("Database download completed.");
            } else {
                message = "Database download failed. Invalid database backup";
                response.setHeader(ConstantUtility.CONTENT_TYPE, ConstantUtility.MEDIA_TYPE_OCTECT);
                response.sendError(500, message);
                log.info("Database download failed.");
            }
        } catch (Exception e) {
            message = "Invalid request";
            response.setHeader(ConstantUtility.CONTENT_TYPE, ConstantUtility.MEDIA_TYPE_OCTECT);
            response.sendError(500, message);
        }

    }

    @GetMapping("/backup-available")
    public ResponseEntity<List<String>> backupAvailable() {
        return new ResponseEntity<>(backupService.backupAvailable(), HttpStatus.OK);
    }

    private void fileDownloader(HttpServletResponse response, ByteArrayOutputStream byteArrayOutputStream) throws IOException {
        response.setHeader(ConstantUtility.CONTENT_TYPE, ConstantUtility.MEDIA_TYPE_OCTECT);
        response.setHeader(ConstantUtility.CONTENT_LENGTH, Integer.toString(byteArrayOutputStream.size()));
        OutputStream outputStream = response.getOutputStream();
        outputStream.write(byteArrayOutputStream.toByteArray());
        outputStream.close();
        response.flushBuffer();
    }

    @SneakyThrows
    @PostConstruct
    public void initPgBackup(){
        backupService.initPgBackup();
    }

}
