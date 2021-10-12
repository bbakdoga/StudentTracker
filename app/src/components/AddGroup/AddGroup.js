import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import APIClient from "../../api/APIClient";
import Navigation from "../Navigation/Navigation";
import AddGroupTable from "./AddGroupTable";
import { userContext } from "../../util/StudentTrackerContext";
import Alert from '@material-ui/lab/Alert';
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IDBHelper from "../../db-helper"
// import { CSVReader } from "react-papaparse";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  container: {
    marginTop: "20px",
    marginBottom: "20px",
    margin: "auto",
    width: "85%",
  },
  input: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#cc0000",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#cc0000",
    },
  },
}));

export default function AddGrouping(props) {
  const classes = useStyles();
  const history = props.history;
  const context = useContext(userContext);
  const [groupTypes, setGroupTypes] = useState([]);
  const [loadingGroupTypes, isLoadingGroupTypes] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [loadingPeriods, isLoadingPeriods] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [error, setError] = useState(false);
  const [state, setState] = useState({
    type: "",
    section: "",
    groupName: "",
    startPeriod: "",
    startYear: "",
    endPeriod: "",
    endYear: "",
    tableHidden: true,
    buttonHidden: false,
    disabled: false,
    groupID: "",
  });
  const year = new Date().getFullYear();
  const years = Array.from(new Array(60), (val, index) => year - index);


  useEffect(() => {

    isLoadingGroupTypes(true);
    isLoadingPeriods(true);

    IDBHelper.getGroupType()
    .then(group_type =>{
      setGroupTypes(group_type);
      isLoadingGroupTypes(false)
    }).then(()=>{
      APIClient.getGroupTypes()
      .then(groupType =>{
        setGroupTypes(groupType);
      })
      .then(isLoadingGroupTypes(false))
      .catch((e) => {
        setError(e);
        isLoadingGroupTypes(false);
      });
    })
    .catch((error) => {
      console.log(error);
    });

    
    

      IDBHelper.getPeriods()
      .then(period_idb =>{
        setPeriods(period_idb);
      })
      .then(()=>{
        APIClient.getPeriods()
        .then( periodsIDB =>{
          setPeriods(periodsIDB)
        })
        .then(isLoadingPeriods(false))
        .catch((e) => {
          setError(e);
          isLoadingPeriods(false);
        });
      })
      .catch((error) => {
        console.log(error);
      })


  }, []);

  if (loadingGroupTypes || loadingPeriods) return <h1>Loading...</h1>;
  //if (error) return <pre>Error</pre>;

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
    //console.log(state)
  };

  const handleClear = () => {
    setState({
      type: "",
      section: "",
      groupName: "",
      startPeriod: "",
      startYear: "",
      endPeriod: "",
      endYear: "",
      tableHidden: true,
      buttonHidden: false,
      disabled: false,
      groupID: "",
    });
  };

  const transferGroups = (group) => {
    APIClient.postUserGroup(context.authUser.usr_id, group).then((response) => {
      setState({
        ...state,
        tableHidden: false,
        buttonHidden: true,
        disabled: true,
        groupID: response[0].grp_id,
      });
      setErrorMessages([]);
      setError(false);
    })
  };

  const handleNext = (event) => {
    /** Error checking the inputed values. */
    let errorList = []
    if (state.type === "") {
      errorList.push("Please Select Group Type")
    }
    if (state.groupName === "") {
      errorList.push("Please Enter Group Name")
    }
    if (state.startPeriod === "") {
      errorList.push("Please Select Start Period")
    }
    if (state.startYear === "") {
      errorList.push("Please Select Start Year")
    }
    if (state.startYear !== "" && state.endYear !== "" && state.startYear > state.endYear) {
      errorList.push("Please Select Valid Time Period")
    }
    if (state.startPeriod !== "" && state.endPeriod !== "" && state.startYear !== "" && state.endYear !== "") {
      const startCalculation = state.startPeriod + state.startYear;
      const endCalculation = state.endPeriod + state.endYear;
      if (startCalculation > endCalculation) {
        errorList.push("Please Select Valid Time Period")
      }
    }

    /** 
     * If there are no input errors, send the new group to the backend. If there are input
     * errors, notify the user and wait for valid input.
     */
    if (errorList.length < 1) {
        APIClient.postUserGroup(context.authUser.usr_id, {
          grp_name: state.groupName,
          grp_section: state.section,
          grp_gtp_id: state.type,
          grp_start_prd_id: state.startPeriod,
          start_year: state.startYear,
          grp_end_prd_id: state.endPeriod,
          end_year: state.endYear,
        })
        .then((response) => {
          setState({
            ...state,
            tableHidden: false,
            buttonHidden: true,
            disabled: true,
            groupID: response[0].grp_id,
          });
          setErrorMessages([]);
          setError(false);
        })
        .catch((error) => {
          let tempGroup = {
            grp_name: state.groupName,
            grp_section: state.section,
            grp_gtp_id: state.type,
            grp_start_prd_id: state.startPeriod,
            start_year: state.startYear,
            grp_end_prd_id: state.endPeriod,
            end_year: state.endYear,
          };
          IDBHelper.saveTempGroup(tempGroup)
          .then()
          .catch((error) => {
            console.log(error);
          });
          window.alert("You are currently offline, your changes will be saved once connection is restored.");
          //setErrorMessages(errorList)
          //setError(true)
        });      


    } else {
      setErrorMessages(errorList)
      setError(true)
    }
  };
  
  return (
    <React.Fragment>
      <Navigation search={false} history={history}> </Navigation>
      <div className={classes.paper}>
        <Grid container spacing={2} component={Paper} className={classes.container}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">Add Group</Typography>
          </Grid>
          <div>
            {error && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>
          <Grid item xs={12} align="left">
            <TextField
              id="type"
              name="type"
              className={classes.input}
              select
              disabled={state.disabled}
              required
              label="Type of Group"
              value={state.type}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            >
              {groupTypes.map((option) => (
                <MenuItem key={option.grp_id} value={option.grp_id}>
                  {option.grp_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} align="center">
            <TextField
              id="groupName"
              required
              className={classes.input}
              disabled={state.disabled}
              name="groupName"
              label="Name of Group"
              placeholder="Enter Group Name"
              value={state.groupName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} align="center">
            {state.type == 1 && (<TextField
              id="section"
              className={classes.input}
              disabled={ state.disabled}
              name="section"
              label="Class Section"
              value={state.section}
              placeholder="Enter Class Section"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />)}
          </Grid>
          <Grid item xs={6} align="center">
            <TextField
              id="startPeriod"
              name="startPeriod"
              select
              disabled={state.disabled}
              className={classes.input}
              required
              label="Start Period"
              value={state.startPeriod}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            >
              {periods.map((option) => (
                <MenuItem key={option.prd_id} value={option.prd_id}>
                  {option.prd_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} align="center">
            <TextField
              id="startYear"
              name="startYear"
              select
              disabled={state.disabled}
              className={classes.input}
              required
              label="Start Year"
              value={state.startYear}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            >
              {years.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} align="center">
            <TextField
              id="endPeriod"
              name="endPeriod"
              select
              disabled={state.disabled}
              className={classes.input}
              label="End Period"
              value={state.endPeriod}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            >
              {periods.map((option) => (
                <MenuItem key={option.prd_id} value={option.prd_id}>
                  {option.prd_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} align="center">
            <TextField
              id="endYear"
              name="endYear"
              select
              disabled={state.disabled}
              className={classes.input}
              label="End Year"
              value={state.endYear}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            >
              {years.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} align="center">
            {!state.buttonHidden && (
              <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                onClick={handleClear}
              >
                Cancel
              </Button>
            )}
          </Grid>
          <Grid item xs={6} align="center">
            {!state.buttonHidden && (
              <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Grid>
          <Grid item xs={12} align="center">
            {!state.tableHidden && <AddGroupTable state={state} periods={periods} years={years} />}
          </Grid>
          <Grid item xs={6} align="center">
            {!state.tableHidden && (
              <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                startIcon={<CancelIcon />}
                onClick={handleClear}
              >
                Cancel
              </Button>
            )}
          </Grid>
          {/* <Grid item xs={4} align="center">
          {!state.tableHidden && <CSVReader />}
            {!state.tableHidden && (<UploadCSV state={state} periods={periods} years={years}/>)}
          </Grid> */}
          <Grid item xs={6} align="center">
            {!state.tableHidden && (
              <Button
                variant="contained"
                color="default"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                <Link
                  to={{
                    pathname: `/groups/${state.groupID}`,
                  }}
                  style={{
                    textTransform: "none",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Save
                </Link>     
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
