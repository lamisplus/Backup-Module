import React, { useState } from "react";
import { Button, CircularProgress, Snackbar } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";

const Restore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const restoreBackup = () => {
    setIsLoading(true);
    // Call your backend API for backup here
    try {
      console.log("backup Db..");
      // Replace with actual API call
      // await axios.post('/api/backup');
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        startIcon={<RestoreIcon />}
        onClick={restoreBackup}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : "Restore Backup"}
      </Button>
      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        onClose={() => setIsSuccess(false)}
        message="Backup successful!"
      />
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={() => setIsError(false)}
        message="Backup failed!"
      />
    </div>
  );
};

export default Restore;
