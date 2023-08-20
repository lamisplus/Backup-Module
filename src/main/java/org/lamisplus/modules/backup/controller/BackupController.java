package org.lamisplus.modules.backup.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class BackupController {
    @GetMapping("/starter")
    public String getEnrollment() {
        return "get backup module";
    }

 
    }