import React, { useState, forwardRef } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { token as token, url as baseUrl } from "../../api";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import RestoreIcon from "@mui/icons-material/Restore";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardBottom: {
    marginBottom: 20,
  },
  Select: {
    height: 45,
    width: 350,
  },
  button: {
    margin: theme.spacing(1),
  },

  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  error: {
    color: "#f85032",
    fontSize: "11px",
  },
  success: {
    color: "#4BB543 ",
    fontSize: "11px",
  },
}));

const History = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState("");

  console.log(props);

  const handleDownload = (row) => {
    console.log("download", row);
    axios
      .get(`${baseUrl}database/download/${row}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response)
      .catch((err) => console.log(err));
  };

  const restoreDownload = (row) => {
    console.log("restore", row);
    axios
      .get(`${baseUrl}database/restore/${row}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response)
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {" "}
      <MaterialTable
        icons={tableIcons}
        title="Database Backup History"
        columns={[
          { title: "File Name", field: "filename" },
          { title: "Action", field: "actions" },
        ]}
        isLoading={loading}
        data={props.databaseBackup.map((row) => ({
          filename: row,
          actions: (
            <>
              <Button
                variant="contained"
                startIcon={<DownloadIcon size="22" />}
                style={{
                  backgroundColor: "rgb(153, 46, 98)",
                  height: "30px",
                  width: "130px",
                }}
                onClick={() => handleDownload(row)}
              >
                Download
              </Button>{" "}
              {/* <Button
                variant="contained"
                endIcon={<RestoreIcon size="22" />}
                style={{
                  backgroundColor: "rgb(153, 46, 98)",
                  height: "30px",
                  width: "130px",
                }}
                onClick={() => restoreDownload(row)}
              >
                Restore
              </Button> */}
            </>
          ),
        }))}
        options={{
          headerStyle: {
            backgroundColor: "#014d88",
            color: "#fff",
            fontSize: "16px",
            padding: "10px",
          },
          searchFieldStyle: {
            width: "200%",
            margingLeft: "250px",
          },
          selection: false,
          filtering: false,
          exportButton: false,
          searchFieldAlignment: "left",
          pageSizeOptions: [10, 20, 100],
          pageSize: 10,
          debounceInterval: 400,
        }}
        //onChangePage={handleChangePage}
        //localization={localization}
      />
    </div>
  );
};

export default History;
