import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { userContext } from "../../util/StudentTrackerContext";
import APIClient from "../../api/APIClient";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";

import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import IDBHelper from '../../db-helper'

const useStyles = makeStyles((theme) => ({
  paper: {
    maxHeight: "66vh",
    overflowY: "scroll",
    overflowX: "hidden",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid",
    borderColor: "#CC0000",
    outline: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "25px",
  },
}));

export default function AddNote(props) {
  const classes = useStyles();
  const { cancel } = props;
  const { interaction } = props;
  const [error, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const context = useContext(userContext);
  const [notes, setNotes] = useState({
    not_int_id: "",
    not_title: "",
    not_text: "",
  });
  

  const handleChange = (event) => {
    const value = event.target.value;
    setNotes({
      ...notes,
      [event.target.name]: value,
    });
    //console.log(notes);
  };

  const handleError = (errorList) => {
    setErrorMessages(errorList);
    setError(true);
  }

  const handleSave = (event) => {

    let errorList = [];
    if (!notes.not_title) {
      errorList.push("Please add a notes title!");
      setError(true);
    }
    if (!notes.not_text) {
      errorList.push("Please add a notes text!");
      setError(true);
    }
    if (errorList.length < 1) {
      notes.not_int_id = interaction.int_id; 
      APIClient.postInteractionNote(context.authUser.usr_id, notes)
      .then((response) => {
        //IDBHelper.saveNotes(notes);
        cancel();
      })
      .catch((error) => {
        IDBHelper.saveTempNotes(notes);
        window.alert("Application is currently offline, note is saved and will be added once online")
        //handleError([[error, '/n', 'Please try again'].join('')]);
      });
    }else {
      handleError(errorList);
    }
  };

  const handleErrorClose = () => {
    setError(false);
  };
  
  return (
    <div className={classes.paper}>
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
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} align="center">
          <Typography variant="h4">Add Note</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            id="not_title"
            name="not_title"
            label="Note Title"
            placeholder="Enter Note Title"
            value={notes.not_title}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            id="not_text"
            name="not_text"
            label="Note Text"
            placeholder="Enter Note Text"
            multiline={true}
            value={notes.not_text}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} align="center">
          <Button
            variant="contained"
            color="default"
            size="small"
            className={classes.button}
            startIcon={<CancelIcon />}
            onClick={() => cancel()}
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
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}