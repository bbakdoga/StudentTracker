import React, { useContext, useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import APIClient from "../../api/APIClient";
import Navigation from "../Navigation/Navigation";
import { userContext } from "../../util/StudentTrackerContext";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import ReactLoading from "react-loading";
import EditGroupInteraction from "./EditGroupInteraction";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Snackbar from "@material-ui/core/Snackbar";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDelete from "./ConfirmDelete";
import IDBHelper from '../../db-helper'

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
  loading: {
    marginTop: "25%",
    margin: "auto",
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

export default function EditGroup(props) {
  const classes = useStyles();
  const context = useContext(userContext);
  const groupId = useRouteMatch().params.groupId;
  const [groupTypes, setGroupTypes] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [interactionRoles, setInteractionRoles] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const history = props.history;
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteGroupSuccess, setDeleteGroupSuccess] = useState(false);

  const [errorMessages, setErrorMessages] = useState([]);
  const [error, setError] = useState(false);
  const [group, setGroup] = useState();
  const [isConfirmDelete, setConfirmDelete] = useState(false);

  const year = new Date().getFullYear();
  const years = Array.from(new Array(60), (val, index) => year - index);

  useEffect(() => {
    APIClient.getGroupTypes()
      .then(setGroupTypes)
      .catch((e) => {
        IDBHelper.getGroupType()
        .then(idb_type =>{
          setGroupTypes(idb_type)
        })
        .catch((error) => {
          console.log(error);
        }) 
        // setErrorMessages("Could not get Group Types.");
        // setError(true);
      });
    APIClient.getPeriods()
      .then(setPeriods)
      .catch((e) => {
        IDBHelper.getPeriods()
        .then(idb_period => {
          setPeriods(idb_period);
        })
        .catch((error) => {
          console.log(error);
        }) 
        // setErrorMessages("Could not get Periods.");
        // setError(true);
      });
    APIClient.getInteractionRoles()
      .then(roles =>{
        setInteractionRoles(roles);
        roles.forEach(element=>{
          IDBHelper.saveInteractionRole(element)
          .then()
          .catch((error) => {
            console.log(error);
          });
        })
      })
      .catch((e) => {
        IDBHelper.getInteractionRole()
        .then(idb_role =>{
          setInteractionRoles(idb_role);
        })
        .catch((error) => {
          console.log(error);
        });
        
        // setErrorMessages("Could not get Interaction Roles.");
        // setError(true);
      });

    APIClient.getGroup(context.authUser.usr_id, groupId)
      .then((group) => {
        setGroup(group[0]);
      })
      .catch((e) => {
        IDBHelper.getGroupsById(groupId)
        .then(idb_group =>{
          setGroup(idb_group);
        })
        .catch((error) => {
          console.log(error);
        });
        // setErrorMessages("Could not get Group.");
        // setError(true);
      });
    
      var idb_interaction = []
      IDBHelper.getInteractions()
      .then(int =>{
        int.forEach(element => {
          if (element.grp_id == groupId){
            idb_interaction.push(element);
          }
        })
      })
      .catch((error) => {
        console.log(error);
      });
      setInteractions(idb_interaction);
      
    APIClient.getUserGroupInteractions(context.authUser.usr_id, groupId)
      .then(async (interactions) => {
        if (interactions.length != 0) {
          setInteractions(interactions);
        }
      })
      .catch((e) => {
        
        // setErrorMessages(["Could not get Interactions."]);
        // setError(true);
      });
  }, []);

  if (!groupTypes || !periods || !interactionRoles || !group || !interactions)
    return (
      <ReactLoading className={classes.loading} type={"bars"} color={"grey"} />
    );
    console.log("here");
    console.log(interactionRoles);

  const saveGroup = async () => {
    let errorList = [];

    if (!group.grp_name) {
      errorList.push("Group Name Required");
    }
    if (!group.grp_gtp_id) {
      errorList.push("Group Type Required");
    }
    if (!group.grp_start_prd_id) {
      errorList.push("Start Period Required");
    }
    if (!group.start_year) {
      errorList.push("Start Year Required");
    }

    setErrorMessages(errorList);
    if (errorList.length > 0) {
      setError(true);
      return;
    }

    await APIClient.putGroup(context.authUser.usr_id, group.grp_id, group).catch((e) =>
      console.log(e)
    );
    setEditSuccess(true);
  };

  const deleteGroup = async () => {
    await APIClient.deleteGroup(context.authUser.usr_id, group.grp_id).catch((e) =>
      console.log(e)
    );
    setDeleteGroupSuccess(true);
    IDBHelper.deleteGroups(group)
    .then()
    .catch((error) => {
      console.log(error);
    });
  };

  const handleChange = (event) => {
    setGroup({
      ...group,
      [event.target.name]: event.target.value,
    });
  };

  const handleDeleteClose = () => {
    setDeleteGroupSuccess(false);
    history.push(`/`);
  };

  const handleSuccessClose = () => {
    setEditSuccess(false);
    history.push(`/groups/${group.grp_id}`);
  };

  const handleErrorClose = () => {
    setError(false);
  };

  return (
    <React.Fragment>
      <Navigation search={false} history={history}>
        {" "}
      </Navigation>
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
      <Snackbar
        open={deleteGroupSuccess}
        autoHideDuration={1500}
        onClose={handleDeleteClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleDeleteClose}
          severity="success"
        >
          {`Group Successfully Deleted`}
        </Alert>
      </Snackbar>
      <Snackbar
        open={editSuccess}
        autoHideDuration={1500}
        onClose={handleSuccessClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleSuccessClose}
        >
          {`${group.grp_name} Edit Successful`}
        </Alert>
      </Snackbar>
      <ConfirmDelete
        deleteGroup={deleteGroup}
        setConfirmDelete={setConfirmDelete}
        open={isConfirmDelete}
      ></ConfirmDelete>
      <Grid
        container
        spacing={2}
        component={Paper}
        className={classes.container}
      >
        <Grid item xs={2} align="center"></Grid>
        <Grid item xs={8} align="center">
          <Typography variant="h4">Edit Group</Typography>
        </Grid>
        <Grid item xs={2} align="center">
          <Button
            onClick={() => {
              setConfirmDelete(true);
            }}
          >
            <DeleteIcon></DeleteIcon>
          </Button>
        </Grid>
        <Grid item xs={12} align="left">
          <TextField
            id="type"
            name="grp_gtp_id"
            className={classes.input}
            select
            required
            label="Type of Group"
            value={group?.grp_gtp_id}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          >
            {groupTypes.map((type) => (
              <MenuItem key={type.grp_id} value={type.grp_id}>
                {type.grp_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} align="center">
          <TextField
            id="groupName"
            required
            name="grp_name"
            className={classes.input}
            label="Name of Group"
            placeholder="Enter Group Name"
            value={group?.grp_name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} align="center">
          {group?.grp_gtp_id === 1 && (
            <TextField
              id="section"
              name="grp_section"
              className={classes.input}
              label="Class Section"
              placeholder="Enter Class Section"
              value={group?.grp_section ? group?.grp_section : ""}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          )}
        </Grid>
        <Grid item xs={6} align="center">
          <TextField
            id="startPeriod"
            name="grp_start_prd_id"
            className={classes.input}
            select
            required
            label="Start Period"
            value={group?.grp_start_prd_id}
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
            name="start_year"
            className={classes.input}
            select
            required
            label="Start Year"
            value={group?.start_year}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          >
            {years.map((option) => {
              if (!group?.end_year || group?.end_year >= option)
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>;
            })}
          </TextField>
        </Grid>
        <Grid item xs={6} align="center">
          <TextField
            id="endPeriod"
            name="grp_end_prd_id"
            className={classes.input}
            select
            label="End Period"
            value={group?.grp_end_prd_id}
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
            name="end_year"
            className={classes.input}
            select
            label="End Year"
            value={group?.end_year}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          >
            {years.map((option) => {
              if (!group?.start_year || group?.start_year <= option)
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
            })}
          </TextField>
        </Grid>
        <Grid item xs={12} align="center">
          <EditGroupInteraction
            interactions={interactions}
            setInteractions={setInteractions}
            group={group}
            interactionRoles={interactionRoles}
            periods={periods}
            years={years}
          />
        </Grid>
        <Grid item xs={6} align="center">
          <Button
            variant="contained"
            color="default"
            size="small"
            className={classes.button}
            startIcon={<CancelIcon />}
            onClick={() => history.push(`/groups/${group.grp_id}`)}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6} align="center">
          <Button
            variant="contained"
            color="default"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => saveGroup(group, interactions)}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
