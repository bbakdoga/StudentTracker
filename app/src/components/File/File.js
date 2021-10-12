import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { userContext } from "../../util/StudentTrackerContext";
import APIClient from "../../api/APIClient";

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import GetAppIcon from "@material-ui/icons/GetApp";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

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
  modal: {
    maxWidth: "66%",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function File(props) {
  const classes = useStyles();
  const { interaction } = props;
  const { setFileOpen } = props;
  const { open } = props;
  const [files, setFiles] = useState();
  const [success, isSuccess] = useState(false);
  const context = useContext(userContext);

  useEffect(async () => {
    if (!open) return;
    let isCancelled = false;
    await APIClient.getFiles(context.authUser.usr_id, interaction.int_id)
      .then((files) => {
        if (!isCancelled) {
          setFiles(files);
        }
      })
      .catch(() => {});
    return () => {
      isCancelled = true;
    };
  }, [props]);

  const handleClose = () => {
    setFileOpen(false);
  };

  const handleSuccessClose = () => {
    isSuccess(false);
  };

  const handleDelete = async (file) => {
    await APIClient.deleteFile(
      context.authUser.usr_id,
      interaction.int_id,
      file.fil_id
    );
    const updated_files = await APIClient.getFiles(
      context.authUser.usr_id,
      interaction.int_id
    );
    setFiles(updated_files);
    isSuccess(true);
  };

  const handleDownload = async (file) => {
    APIClient.downloadFile(
      context.authUser.usr_id,
      interaction.int_id,
      file.fil_id
    ).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = file.fil_real_name;
        a.click();
      });
      //window.location.href = response.url;
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <React.Fragment>
        <Snackbar
          open={success}
          onClose={handleSuccessClose}
          autoHideDuration={1500}
        >
          <Alert
            elevation={6}
            onClose={handleSuccessClose}
            variant="filled"
            severity="success"
          >
            {"File Successfully Deleted"}
          </Alert>
        </Snackbar>
        <div className={classes.paper}>
          <Grid align="center" container spacing={2} direction="row">
            <Grid align="center" item xs={12}>
              <Button
                variant="contained"
                color="default"
                size="small"
                startIcon={<NoteAddIcon />}
                onClick={() => console.log("Edit")}
              >
                ADD FILE
              </Button>
            </Grid>
            {files?.map((file) => (
              <Grid item xs={12} key={file?.fil_id}>
                <Card style={{ width: "75%" }}>
                  <Typography component={Paper}>
                    <CardHeader
                      id="simple-modal-title"
                      title={
                        <Typography variant="h4">
                          {" "}
                          {file?.fil_title}{" "}
                        </Typography>
                      }
                      action={
                        <React.Fragment>
                          <IconButton
                            aria-label="settings"
                            onClick={() => {
                              handleDownload(file);
                            }}
                          >
                            <GetAppIcon />
                          </IconButton>
                          <IconButton
                            aria-label="settings"
                            onClick={() => {
                              handleDelete(file);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </React.Fragment>
                      }
                      subheader={file?.fil_name}
                    />
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </React.Fragment>
    </Modal>
  );
}
