import React, { useContext, useState, useEffect } from "react";
import { forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import APIClient from "../../api/APIClient";
import { userContext } from "../../util/StudentTrackerContext";
import MaterialTable from "material-table";
import Note from "../Note/Note";
import File from "../File/File";

/** Material-UI Icons for the Table */
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
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
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import IDBHelper from '../../db-helper';


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
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "0px",
    margin: "auto",
    width: "85%",
  },
}));

export default function EditGroupTable(props) {
  const classes = useStyles();
  const { group } = props;
  const authUserId = useContext(userContext).authUser.usr_id;
  const [interactions, setInteractions] = useState(props.interactions);
  const [error, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  
  // Notes Variables
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteInteraction, setNoteInteraction] = useState();

  // Files Variables
  const [filesOpen, setFilesOpen] = useState(false);
  const [interactionFiles, setInteractionFiles] = useState();

  useEffect(() => {
    setInteractions(props.interactions);
  }, [props]);

  const roles = props.interactionRoles.reduce(function (acc, cur, i) {
    acc[cur.irl_id] = cur.irl_name;
    return acc;
  }, {});

  const prds = props.periods.reduce(function (acc, cur, i) {
    acc[cur.prd_id] = cur.prd_name;
    return acc;
  }, {});

  const yrs = props.years.reduce(function (acc, cur, i) {
    acc[cur] = cur;
    return acc;
  }, {});

  const columns = [
    { title: "First Name", field: "usr_first_name" },
    { title: "Last Name", field: "usr_last_name" },
    { title: "Email", field: "usr_email" },
    { title: "Unity ID", field: "usr_unity_id" },
    { title: "Role", field: "int_irl_id", lookup: roles },
    { title: "not_title", field: "not_title", hidden: true },
    {
      title: "Start Period",
      field: "int_start_prd_id",
      lookup: prds,
      initialEditValue: group.grp_start_prd_id,
    },
    {
      title: "Start Year",
      field: "start_year",
      lookup: yrs,
      initialEditValue: group.start_year,
    },
    {
      title: "End Period",
      field: "int_end_prd_id",
      lookup: prds,
      initialEditValue: group.grp_end_prd_id,
    },
    {
      title: "End Year",
      field: "end_year",
      lookup: yrs,
      initialEditValue: group.end_year,
    },
  ];

  const handleRowAdd = (newData, resolve, reject) => {
    let errorList = [];
    if (newData.usr_first_name === undefined) {
      errorList.push("First Name Required");
      setError(true);
    }
    if (newData.usr_last_name === undefined) {
      errorList.push("Last Name Required");
      setError(true);
    }
    if (newData.usr_unity_id === undefined) {
      errorList.push("Unity ID Required");
    }
    if (newData.usr_email === undefined) {
      errorList.push("Valid Email Required");
    }
    if (newData.usr_unity_id === undefined) {
      errorList.push("Unity ID Required");
      setError(true);
    }
    if (newData.int_irl_id === undefined) {
      errorList.push("Role Required");
      setError(true);
    }

    if (errorList.length < 1) {
      APIClient.postUserInteraction(authUserId, [
        {
          grp_id: group.grp_id,
          usr_first_name: newData.usr_first_name,
          usr_last_name: newData.usr_last_name,
          usr_email: newData.usr_email,
          usr_unity_id: newData.usr_unity_id,
          int_irl_id: newData.int_irl_id,
          not_title: "",
          not_text: newData.not_text,
          int_start_prd_id: newData.int_start_prd_id,
          start_year: newData.start_year,
          int_end_prd_id: newData.int_end_prd_id,
          end_year: newData.end_year,
        },
      ])
        .then((response) => {
          const dataUpdate = [...interactions];
          dataUpdate.push(response[0]);
          setInteractions(dataUpdate);
          props.setInteractions(dataUpdate);
          resolve();
        })
        .catch((error) => {
          var temp_interaction = [{
            grp_id: group.grp_id,
          usr_first_name: newData.usr_first_name,
          usr_last_name: newData.usr_last_name,
          usr_email: newData.usr_email,
          usr_unity_id: newData.usr_unity_id,
          int_irl_id: newData.int_irl_id,
          not_title: "",
          not_text: newData.not_text,
          int_start_prd_id: newData.int_start_prd_id,
          start_year: newData.start_year,
          int_end_prd_id: newData.int_end_prd_id,
          end_year: newData.end_year,
          }];
          IDBHelper.saveTempInteractions(temp_interaction);
          window.alert("You are currently offline. Changes will be saved once you are online");
          // setErrorMessages(["Cannot add data. Server error!"]);
          // setError(true);
          reject();
        });
    } else {
      setErrorMessages(errorList);
      setError(true);
      reject();
    }
  };

  const handleRowDelete = (oldData, resolve, reject) => {
    APIClient.deleteUserInteraction(authUserId, group.grp_id, oldData.int_id)
      .then((response) => {
        APIClient.getUserGroupInteractions(authUserId, group.grp_id).then(
          (response) => {
            setInteractions(response);
            props.setInteractions(response);
          }
        );
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        reject();
      });
  };

  const handleRowEdit = async (newData, oldData, resolve, reject) => {
    const index = interactions.findIndex(
      (int) => int.int_id === newData.int_id
    );

    const updatedInteraction = await APIClient.putUserInteraction(
      authUserId,
      group.grp_id,
      interactions[index].int_id,
      newData
    );

    const dataUpdate = [...interactions];
    dataUpdate[index] = updatedInteraction[0];
    setInteractions([...dataUpdate]);
    props.setInteractions([...dataUpdate]);

    resolve();
  };

  const handleErrorClose = () => {
    setError(false);
  };

  return (
    <React.Fragment>
      <Snackbar open={error} onClose={handleErrorClose}>
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleErrorClose}
          severity="error"
        >
          {errorMessages.map((msg, i) => {
            return <div key={i}>{msg}</div>;
          })}{" "}
        </Alert>
      </Snackbar>

      <Grid container spacing={1} justify="center">
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <MaterialTable
            className={classes.container}
            component={Paper}
            title="Edit Group Interactions"
            columns={columns}
            data={interactions}
            icons={tableIcons}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  handleRowAdd(newData, resolve, reject);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  handleRowDelete(oldData, resolve, reject);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  handleRowEdit(newData, oldData, resolve, reject);
                }),
            }}
            actions={[
              {
                icon: () => <SpeakerNotesIcon></SpeakerNotesIcon>,
                tooltip: "Edit Notes",
                onClick: (event, rowData) => {
                  setNoteOpen(true);
                  setNoteInteraction(rowData);
                },
              },
              {
                icon: () => <AttachFileIcon></AttachFileIcon>,
                tooltip: "Edit Files",
                onClick: (event, rowData) => {
                  setFilesOpen(true);
                  setInteractionFiles(rowData);
                },
              },
            ]}
            options={{
              headerStyle: {
                backgroundColor: "dimgray",
                fontWeight: "bold",
                fontSize: 16,
                color: "white",
                align: "center",
              },
              pageSize: 10,
              pageSizeOptions: [10, 20, 30],
              emptyRowsWhenPaging: false,
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <Note
        interaction={noteInteraction}
        setNoteOpen={setNoteOpen}
        open={noteOpen}
      ></Note>
      <File
        interaction={interactionFiles}
        setFileOpen={setFilesOpen}
        open={filesOpen}
      ></File>
    </React.Fragment>
  );
}
