import React, { useState } from "react";
import { CircularProgress, Snackbar } from "@mui/material";
import MatButton from "@material-ui/core/Button";
import axios from "axios";
import { token as token, url as baseUrl } from "../../api";
import { toast } from "react-toastify";
import BackupIcon from "@mui/icons-material/Backup";
import LoadingMessageModal from "./parts/LoadingMessageModal";



const Backup = (props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleBackup = () => {
    props.setIsLoading(true);
    // Call your backend API for backup here
    try {
      console.log("backup Db..");
      axios
        .get(`${baseUrl}database/backup`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          //console.log(response);
          props.setIsLoading(false);
          props.pullDatabaseBackup();
          toast.success("Database Backup successfully");
        })
        .catch((error) => {
          toast.error("Error: Database Backup failed!");
          props.setIsLoading(false);
        });
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div>
      <MatButton
        variant="contained"
        startIcon={<BackupIcon />}
        onClick={handleBackup}
        disabled={isSuccess}
        style={{ backgroundColor: "#014d88", color: "#fff", float: "right" }}
      >
        {"Backup Database"}
      </MatButton>
            {/* {<LoadingMessageModal   show={true} /> } */}

      {props.isLoading && <LoadingMessageModal   show={true} message='Backing Up Database...'/>  }
    </div>
  );
};

export default Backup;
