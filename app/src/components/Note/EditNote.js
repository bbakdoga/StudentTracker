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
import DeleteIcon from "@material-ui/icons/Delete";

import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

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

export default function EditNote(props) {
  const classes = useStyles();
  const { cancel } = props;
  const { editNote } = props;
  const [error, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const context = useContext(userContext);
  const [notes, setNotes] = useState({
    not_int_id: editNote.not_int_id,
    not_title: editNote.not_title,
    not_text: editNote.not_text,
  });
  const [deleteMessageOpen, setDeleteMessageOpen] = useState(false);
  
  const handleError = (errorList) => {
    setErrorMessages(errorList);
    setError(true);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setNotes({
      ...notes,
      [event.target.name]: value,
    });
  };

  const handleDelete = (event) => {
    APIClient.deleteInteractionNotes(context.authUser.usr_id, editNote.not_int_id, 
    editNote.not_id, notes)
    .then((response) => {
      IDBHelper.deleteNote(editNote.not_id)
      cancel();
    })
    .catch((error) => {
      handleError([[error, '/n', 'Could not delete, please try again'].join('')]);
    });
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
      APIClient.putInteractionNotes(context.authUser.usr_id, editNote.not_int_id,editNote.not_id, notes)
      .then((response) => {
        cancel();
      })
      .catch((error) => {
        handleError([[error, '/n', 'Please try again'].join('')]);
      });
    } else {
      handleError(errorList);
    }
   };

   const handleErrorClose = () => {
    setError(false);
  };

  const handleDeleteClose = () => {
    setDeleteMessageOpen(false);
  }

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
      <Dialog
        open={deleteMessageOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this note?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={2} align="center"></Grid>
        <Grid item xs={8} align="center">
          <Typography variant="h4">Edit Note</Typography>
        </Grid>
        <Grid item xs={2} align="center">
          <Button
            onClick={() => setDeleteMessageOpen(true)}
          >
            <DeleteIcon></DeleteIcon>
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            id="not_title"
            name="not_title"
            label="Note Title"
            placeholder={editNote.not_title}
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
            label="Note text"
            placeholder={editNote.not_text}
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
