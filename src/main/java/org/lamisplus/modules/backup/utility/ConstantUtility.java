package org.lamisplus.modules.backup.utility;

import java.io.File;


public class ConstantUtility {
    private ConstantUtility() {}

    public static final String BASE_DIR = System.getProperty("user.dir");
    public static final String BACKUP_BASE_DIR = BASE_DIR + File.separator + "backup" + File.separator;
    public static final String CONTENT_TYPE = "Content-Type";
    public static final String MEDIA_TYPE_OCTECT = "application/octet-stream";
    public static final String CONTENT_LENGTH = "Content-Length";

}