import React, { useContext, useState, useEffect } from 'react';
import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import APIClient from "../../api/APIClient";
import { userContext } from "../../util/StudentTrackerContext";
import Note from "../Note/Note";
import Button from "@material-ui/core/Button";
import MaterialTable from 'material-table';
import Tooltip from '@material-ui/core/Tooltip';
import { CSVReader } from "react-papaparse";

/** Material-UI Icons for the Table */
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';
import IDBHelper from '../../db-helper';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
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
    width: "100%",
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
}));

/**
 * Main component. Calls table components.
 */
export default function AddGroupTable(props) {
  const classes = useStyles();
  const context = useContext(userContext);
  const { state } = props;
  const groupId = state.groupID;
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [interactionRoles, setInteractionRoles] = useState([]);
  const [loadingInteractionRoles, isLoadingInteractionRoles] = useState(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [interactionNotes, setInteractionNotes] = useState(null);
  const buttonRef = React.createRef();

  useEffect(() => {
    isLoadingInteractionRoles(true);
    APIClient.getInteractionRoles()
      .then(setInteractionRoles)
      .then(isLoadingInteractionRoles(false))
      .catch((e) => {
        setError(e);
        isLoadingInteractionRoles(false);
      });
  }, []);

  if (loadingInteractionRoles) return <h1>Loading...</h1>;
  //if (error) return <pre>Error</pre>;

  /** Loads in the Role options for the dropdowns. */
  var roles = interactionRoles.reduce(function(acc, cur, i) {
    acc[cur.irl_id] = cur.irl_name;
    return acc;
  }, {});

  /** Loads in the Period options for the dropdowns. */
  var prds = props.periods.reduce(function(acc, cur, i) {
    acc[cur.prd_id] = cur.prd_name;
    return acc;
  }, {});

  /** Loads in the Years options for the dropdowns. */
  var yrs = props.years.reduce(function(acc, cur, i) {
    acc[cur] = cur;
    return acc;
  }, {});

  /** Defines the columns in the table. */
  var columns = [
    {title: "grp_id", field: "grp_id", hidden: true},
    {title: "First Name", field: "usr_first_name"},
    {title: "Last Name", field: "usr_last_name"},
    {title: "Email", field: "usr_email"},
    {title: "Unity ID", field: "usr_unity_id"},
    {title: "Role", field: "int_irl_id", lookup: roles},
    {title: "not_title", field: "not_title", hidden: true},
    {title: "Start Period", field: "int_start_prd_id", lookup: prds, initialEditValue: state.startPeriod},
    {title: "Start Year", field: "start_year", lookup: yrs, initialEditValue: state.startYear},
    {title: "End Period", field: "int_end_prd_id", lookup: prds, initialEditValue: state.endPeriod},
    {title: "End Year", field: "end_year", lookup: yrs, initialEditValue: state.endYear}
    // {title: "Notes/Files",
    //  field: "not_text",
    //  editComponent: props => (
    //   <div>
    //     <Tooltip title="Add/Edit Notes">
    //       <Button onClick={() => setNotesOpen(true)}>
    //         <SpeakerNotesIcon fontSize="small"></SpeakerNotesIcon>
    //       </Button>
    //     </Tooltip>
    //     <Tooltip title="Add/Edit Files">
    //       <Button onClick={() => setNotesOpen(true)}>
    //         <AttachFileOutlinedIcon fontSize="small"></AttachFileOutlinedIcon>
    //       </Button>
    //     </Tooltip>
    //    <Note
    //       interaction={interactionNotes}
    //       setNoteOpen={setNotesOpen}
    //       open={notesOpen}
    //   ></Note>
    //   </div>
    // )} 
  ]

  /**
  * The following three methods handle the upload CSV file functionality.
  */

  /** Handles the initial event click of the CSV file being uploaded. */
  const handleOpenDialog = (event) => {
    if (buttonRef.current) {
      buttonRef.current.open(event)
    }
  };

  /** Parses the data in the CSV file and adds it to the interaction table. */
  const handleOnFileLoad = (data) => {
    for (let i = 0; i < data.length; i++) {
      APIClient.postUserInteraction(context.authUser.usr_id, [{
        grp_id: groupId,
        usr_first_name: data[i].data.name.split(' ').slice(-1).join(' '),
        usr_last_name: data[i].data.name.split(', ').slice(0, -1).join(' '),
        usr_email: data[i].data.email,
        usr_unity_id: data[i].data.unity_id,
        int_irl_id: 1,
        not_title: "",
        not_text: "",
        int_start_prd_id: state.startPeriod,
        start_year: state.startYear,
        int_end_prd_id: state.endPeriod,
        end_year: state.endYear,
      }])
      .then(res => {
        APIClient.getUserGroupInteractions(context.authUser.usr_id, groupId).then(response => {
          setData(response);
        })
        // setErrorMessages([]);
        setError(false);
        // resolve();
      })
      .catch(error => {
        // setErrorMessages(errorList);
        setError(true);
        // reject();
      })
    }
  };

  /** Handles any errors in uploading a CSV file. */
  const handleOnError = (error, file, inputElement, reason) => {
    console.log(error);
  };

  /**
   * Adds the interaction to the table.
   */
  const handleRowAdd = (newData, resolve, reject) => {

    /** Error checking the inputed values. */
    let errorList = []
    //console.log(newData.usr_first_name)
    if(newData.usr_first_name === undefined) {
      errorList.push("Please Enter First Name")
    }
    if(newData.usr_last_name === undefined) {
      errorList.push("Please Enter Last Name")
    }
    if(newData.usr_email === undefined) {
      errorList.push("Please Enter Email")
    }
    if(newData.usr_unity_id === undefined) {
      errorList.push("Please Enter Unity ID")
    }
    if(newData.int_irl_id === undefined) {
      errorList.push("Please Enter Role")
    }

    /** 
     * If there are no input errors, send the new interaction to the backend
     * and repopulate the table with the updated backend. If there are input
     * errors, notify the user and wait for valid input.
     */
    if (errorList.length < 1) {
      APIClient.postUserInteraction(context.authUser.usr_id, [{
        grp_id: groupId,
        usr_first_name: newData.usr_first_name,
        usr_last_name: newData.usr_last_name,
        usr_email: newData.usr_email,
        usr_unity_id: newData.usr_unity_id,
        int_irl_id: +newData.int_irl_id,
        not_title: "",
        not_text: newData.not_text,
        int_start_prd_id: +newData.int_start_prd_id,
        start_year: +newData.start_year,
        int_end_prd_id: +newData.int_end_prd_id,
        end_year: +newData.end_year,
      }])
      .then(res => {
        APIClient.getUserGroupInteractions(context.authUser.usr_id, groupId).then(response => {
          setData(response);
        })
        setErrorMessages([]);
        setError(false);
        resolve();
      })
      .catch(error => {
        var temp_interaction = [{
          grp_id: groupId,
          usr_first_name: newData.usr_first_name,
          usr_last_name: newData.usr_last_name,
          usr_email: newData.usr_email,
          usr_unity_id: newData.usr_unity_id,
          int_irl_id: +newData.int_irl_id,
          not_title: "",
          not_text: newData.not_text,
          int_start_prd_id: +newData.int_start_prd_id,
          start_year: +newData.start_year,
          int_end_prd_id: +newData.int_end_prd_id,
          end_year: +newData.end_year,
        }];
        IDBHelper.saveInteractions(temp_interaction);
        window.alert("You are currently offline. Changes will be saved once you are online");
        // setErrorMessages(errorList);
        // setError(true);
        // reject();
      })
    } else {
      setErrorMessages(errorList);
      setError(true);
      reject();
    }
  }

  /**
   * Deletes a row entry (interaction) from the table.
   */
  const handleRowDelete = (oldData, resolve) => {
    APIClient.deleteUserInteraction(context.authUser.usr_id, groupId, oldData.int_id)
      .then(res => {
        APIClient.getUserGroupInteractions(context.authUser.usr_id, groupId)
          .then(response => {
            setData(response);
          })
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"]);
        setError(true);
        resolve();
      })
  }
  
  /**
   * Updates the selected row (interaction) in the table.
   */
  const handleRowUpdate = (newData, oldData, resolve, reject) => {

    console.log(oldData)
    
    /** Error checking the inputed values. */
    let errorList = []
    if(newData.usr_first_name === undefined) {
      errorList.push("Please Enter First Name")
    }
    if(newData.usr_last_name === undefined) {
      errorList.push("Please Enter Last Name")
    }
    if(newData.usr_email === undefined) {
      errorList.push("Please Enter Email")
    }
    if(newData.usr_unity_id === undefined) {
      errorList.push("Please Enter Unity ID")
    }
    if(newData.int_irl_id === undefined) {
      errorList.push("Please Enter Role")
    }
    
    /** 
     * If there are no input errors, send the updated interaction to the backend
     * and repopulate the table with the updated backend. If there are input
     * errors, notify the user and wait for valid input.
     */
    if (errorList.length < 1) {
      APIClient.putUserInteraction(context.authUser.usr_id, groupId, newData.int_id, {
        grp_id: groupId,
        usr_first_name: newData.usr_first_name,
        usr_last_name: newData.usr_last_name,
        usr_email: newData.usr_email,
        usr_unity_id: newData.usr_unity_id,
        int_irl_id: +newData.int_irl_id,
        not_title: "",
        not_text: newData.not_text,
        int_start_prd_id: +newData.int_start_prd_id,
        start_year: +newData.start_year,
        int_end_prd_id: +newData.int_end_prd_id,
        end_year: +newData.end_year,
      })
      .then(response => {
        APIClient.getUserGroupInteractions(context.authUser.usr_id, groupId).then(response => {
          setData(response);
        })
        setErrorMessages([]);
        setError(false);
        resolve();
      })
      .catch(error => {
        setErrorMessages(errorList);
        setError(true);
        reject();
      })
    } else {
      setErrorMessages(errorList);
      setError(true);
      reject();
    }
  }

  return (
    <div>
      <Grid container spacing={1} justify="center">
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <div>
            {error && <Alert severity="error">
              {errorMessages.map((msg, i) => {
                return <div key={i}>{msg}</div>
              })} </Alert>
            }       
          </div>  
          <MaterialTable
            className={classes.container}
            component={Paper}
            title="Add Users to Group"
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  handleRowAdd(newData, resolve, reject)
              }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve)
              }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  handleRowUpdate(newData, oldData, resolve, reject);
              }),
            }}
            actions={[
              {
                icon: () => <SpeakerNotesIcon></SpeakerNotesIcon>,
                tooltip: "Edit Notes",
                onClick: (event, rowData) => {
                  setNotesOpen(true);
                  setInteractionNotes(rowData);
                },
              }//,
              // {
              //   icon: () => <AttachFileIcon></AttachFileIcon>,
              //   tooltip: "Edit Files",
              //   onClick: (event, rowData) => {
              //     setFilesOpen(true);
              //     setInteractionFiles(rowData);
              //   },
              // },
            ]}
            options={{
              headerStyle: {
                backgroundColor: "dimgray",
                fontWeight: "bold",
                fontSize: 16,
                color: "white",
                align: "center"
              }
            }}
          />
          <Grid className={classes.paper} item xs={3} sm={3}>
            <CSVReader
             ref={buttonRef}
             onFileLoad={handleOnFileLoad}
             onError={handleOnError}
             style={{}}
             config={{
               header: true,
               skipEmptyLines: true,
               dynamicTyping: true,
               transformHeader: function(header) {
                 return header.replace(/\s/g, '_')
                              .toLowerCase();
               }
             }}
             addRemoveButton
            >
              <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                onClick={handleOpenDialog}
              >
                Upload CSV
              </Button>
            </CSVReader>
          </Grid>
        </Grid>
      </Grid>
      <Note
        interaction={interactionNotes}
        setNoteOpen={setNotesOpen}
        open={notesOpen}
      ></Note>
      {/* <File
        interaction={interactionFiles}
        setFileOpen={setFilesOpen}
        open={filesOpen}
      ></File> */}
    </div>
  );
}