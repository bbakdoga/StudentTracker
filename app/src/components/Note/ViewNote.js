import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Button from "@material-ui/core/Button";

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

export default function ViewNote(props) {
  const { notes } = props;
  const { addNote } = props;
  const { editNote } = props;
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Grid align="center" container spacing={2} direction="row">
        <Grid align="right" item xs={2}>
          <Button
            variant="contained"
            color="default"
            size="small"
            className={classes.button}
            startIcon={<NoteAddIcon />}
            onClick={() => addNote()}
          >
            Add Note
          </Button>
        </Grid>
        
        {notes?.map((note) => (
          <Grid item xs={12} key={note.not_id}>
            <Card>
              <Typography component={Paper}>
                <CardHeader
                  id="simple-modal-title"
                  title={
                    <Typography variant="h4"> {note?.not_title} </Typography>
                  }
                  action={
                    <IconButton
                      aria-label="settings"
                      onClick={() => editNote(note)}
                    >
                      <EditIcon />
                    </IconButton>
                  }
                  subheader={note?.not_text}
                />
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
