import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { userContext } from "../../util/StudentTrackerContext";
import APIClient from "../../api/APIClient";
import ViewNote from "./ViewNote";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import IDBHelper from "../../db-helper"

const useStyles = makeStyles((theme) => ({
  modal: {
    maxWidth: "66%",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Note(props) {
  const classes = useStyles();
  const { interaction } = props;
  const { setNoteOpen } = props;
  const { open } = props;
  const context = useContext(userContext);
  const [displayNotes, setDisplayNotes] = useState();
  const [editNote, setEditNote] = useState();

  // View note for view, edit, and add
  const [viewOpen, setViewOpen] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const showAddNote = () => {
    setViewOpen(false);
    setEditOpen(false);
    setAddOpen(true);
  };

  const showEditNote = (editingNote) => {
    setEditNote(editingNote);
    setViewOpen(false);
    setAddOpen(false);
    setEditOpen(true);
  };

  const showViewNote = () => {
    getDisplayNotes();
    setEditOpen(false);
    setAddOpen(false);
    setViewOpen(true);
  }

  const getDisplayNotes = async (isCancelled) => {
    await APIClient.getNotes(context.authUser.usr_id, interaction.int_id)
      .then((notesReturned) => {
        if (!isCancelled && notesReturned) {
          //console.log(notesReturned);
          setDisplayNotes(notesReturned);
        }
      })
      .catch((error) => {
        IDBHelper.getNotes().then(idb_notes => {
          var idb_disp_note = []
          idb_notes.forEach(note => {
            if(interaction.int_id == note.not_int_id){
              idb_disp_note.push(note);
            }
          })
          setDisplayNotes(idb_disp_note)
        })
        //console.log("Error in use Effect note ", error);
        //handleClose();
      });
  }

  useEffect(async () => {
    if (!open) return;
    let isCancelled = false;
    //console.log("Interaction id for notes", interaction.int_id);
    getDisplayNotes(isCancelled);
    return () => {
      isCancelled = true;
    };
  }, [props]);

  const handleClose = () => {
    showViewNote();
    setNoteOpen(false);
  };

  return (
    // VIEW COMPONENT AND THEN CALL ADD/EDIT BASED ON ACTION
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <React.Fragment>
        {viewOpen && <ViewNote notes={displayNotes} addNote={showAddNote} editNote={showEditNote}></ViewNote>}
        {addOpen && <AddNote cancel={showViewNote} interaction={interaction}></AddNote>}
        {editOpen && <EditNote cancel={showViewNote} editNote={editNote}></EditNote>}
      </React.Fragment>
    </Modal>
  );
}