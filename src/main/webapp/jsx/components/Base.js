import React, { useState, useEffect } from "react";
import { Container, Grid, Paper } from "@mui/material";
import axios from "axios";
import { token as token, url as baseUrl } from "../../api";
import Backup from "./Backup";
import Restore from "./Restore";
import History from "./History";

const Base = () => {
  const [databaseBackup, setDatabaseBackup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const pullDatabaseBackup = () => {
    axios
      .get(`${baseUrl}database/backup-available`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setDatabaseBackup(response.data));
  };

  useEffect(() => {
    pullDatabaseBackup();
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <br />
        <Grid item xs={12} md={12}>
          <Backup
            pullDatabaseBackup={pullDatabaseBackup}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <Paper elevation={3} variant="outlined" square>
            <Restore />
          </Paper>
        </Grid> */}
        <Grid item xs={12} md={12}>
          <br />
          <History databaseBackup={databaseBackup} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Base;
