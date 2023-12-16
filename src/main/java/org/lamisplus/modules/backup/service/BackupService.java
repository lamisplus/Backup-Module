package org.lamisplus.modules.backup.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;


public interface BackupService {
    void upload(MultipartFile file);
    ByteArrayOutputStream downloadBackup(String databaseName) throws IOException;
    int backupPGSQL(boolean restore);
    int restorePGSQL(String fileName);
    List<String> backupAvailable();
    void cleanupBackup();
    void backupCleanup();
    void initPgBackup();
    String getFileExtension(String fullName);

}
