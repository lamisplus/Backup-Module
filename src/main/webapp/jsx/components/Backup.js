import React, { useState } from "react";
import { CircularProgress, Snackbar } from "@mui/material";
import MatButton from "@material-ui/core/Button";
import axios from "axios";
import { token as token, url as baseUrl } from "../../api";

import BackupIcon from "@mui/icons-material/Backup";

const Backup = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleBackup = () => {
    setIsLoading(true);
    // Call your backend API for backup here
    try {
      console.log("backup Db..");
      axios
        .get(`${baseUrl}database/backup`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          setIsLoading(false);
          props.pullDatabaseBackup();
        });
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <MatButton
        variant="contained"
        startIcon={<BackupIcon />}
        onClick={handleBackup}
        disabled={isLoading}
        style={{ backgroundColor: "#014d88", color: "#fff", float: "right" }}
      >
        {"Backup Database"}
      </MatButton>
      {isLoading ? <CircularProgress size={24} /> : "Backup Database"}
    </div>
  );
};

export default Backup;
