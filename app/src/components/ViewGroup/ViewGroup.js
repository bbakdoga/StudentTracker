import React, { useEffect, useState, useContext } from "react";
import { useRouteMatch } from "react-router";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import APIClient from "../../api/APIClient";
import Card from "@material-ui/core/Card";
import calcTimePeriod from "../../util/TimePeriodCalculation";
import { userContext } from "../../util/StudentTrackerContext";
import Navigation from "../Navigation/Navigation";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import ReactLoading from "react-loading";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import Note from "../Note/Note";
import File from "../File/File";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import IDBHelper from "../../db-helper"

// Defines the styles for the Interaction table.
const useStyles = makeStyles((theme) => ({
  root: {
    width: "85%",
    marginTop: "20px",
    marginLeft: "7.5%",
    backgroundColor: "transparent",
    shadowOpacity: 0,
    elevation: 0,
  },
  media: {
    height: 140,
  },
  titles: {
    backgroundColor: "dimgray",
  },
  titlesText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  container: {
    marginTop: "20px",
    marginBottom: "20px",
    margin: "auto",
    width: "85%",
  },
  avatar: {
    color: theme.palette.getContrastText("#d3d3d3"),
    backgroundColor: "lightgray",
  },
  loading: {
    marginTop: "25%",
    margin: "auto",
  },
}));

/**
 * Interaction table component. Builds the interaction table.
 * @param props for the interactions data.
 */
function InteractionsTable(props) {
  const classes = useStyles();
  const interactions = props.data;

  // Notes Variables
  const [notesOpen, setNotesOpen] = useState(false);
  const [interactionNotes, setInteractionNotes] = useState();

  // Files Variables
  const [filesOpen, setFilesOpen] = useState(false);
  const [interactionFiles, setInteractionFiles] = useState();

  if (!interactions) return null;

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table>
        <TableHead className={classes.titles}>
          <TableRow>
            <TableCell
              className={classes.titlesText}
              align="center"
            ></TableCell>
            <TableCell className={classes.titlesText} align="center">
              Student Name
            </TableCell>
            <TableCell className={classes.titlesText} align="center">
              Email
            </TableCell>
            <TableCell className={classes.titlesText} align="center">
              Unity ID
            </TableCell>
            <TableCell className={classes.titlesText} align="center">
              Role
            </TableCell>
            <TableCell className={classes.titlesText} align="center">
              Time Period
            </TableCell>
            <TableCell className={classes.titlesText} align="center">
              Notes
            </TableCell>
            <TableCell className={classes.titlesText} align="center">
              Files
            </TableCell>
            <TableCell className={classes.titlesText} align="center">
              Total Interactions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {interactions.map((interaction) => {
            return (
              <TableRow key={interaction.usr_id}>
                <TableCell align="center">
                  <Avatar className={classes.avatar}>
                    {interaction.usr_first_name.toUpperCase().charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell align="center">
                  <Button>
                    <Link
                      to={{
                        pathname: `/users/${interaction.usr_id}`,
                      }}
                      style={{
                        textTransform: "none",
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      <Typography>
                        {interaction.usr_first_name +
                          " " +
                          interaction.usr_last_name}
                      </Typography>
                    </Link>
                  </Button>
                </TableCell>
                <TableCell align="center">{interaction.usr_email}</TableCell>
                <TableCell align="center">{interaction.usr_unity_id}</TableCell>
                <TableCell align="center">{interaction.irl_name}</TableCell>
                <TableCell align="center">
                  {calcTimePeriod(interaction)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      setNotesOpen(true);
                      setInteractionNotes(interaction);
                    }}
                  >
                    <SpeakerNotesIcon></SpeakerNotesIcon>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      setFilesOpen(true);
                      setInteractionFiles(interaction);
                    }}
                  >
                    <AttachFileIcon />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  {props.count ? props.count[interaction.usr_id] : ""}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Note
        interaction={interactionNotes}
        setNoteOpen={setNotesOpen}
        open={notesOpen}
      ></Note>
      <File
        interaction={interactionFiles}
        setFileOpen={setFilesOpen}
        open={filesOpen}
      ></File>
    </TableContainer>
  );
}
/**
 * Main component. Calls and gets the interaction table components.
 */
export default function ViewGroup(props) {
  const groupId = useRouteMatch().params.groupId;
  const [group, setGroup] = useState();
  const [interactions, setInteractions] = useState([]);
  const [displayInteractions, setDisplayInteractions] = useState();
  const [error, setError] = useState();
  const context = useContext(userContext);
  const classes = useStyles();
  const history = props.history;

  const handleSearch = (input) => {
    //Reset Filter
    setDisplayInteractions(interactions);

    let filterInteractions = interactions.filter(
      (interaction) =>
        interaction.usr_first_name
          .toLowerCase()
          .includes(input.toLowerCase()) ||
        interaction.usr_unity_id.toLowerCase().includes(input.toLowerCase()) ||
        interaction.start_period.toLowerCase().includes(input.toLowerCase()) ||
        interaction.start_year.toString().includes(input.toLowerCase()) ||
        interaction.end_period?.toLowerCase().includes(input.toLowerCase()) ||
        interaction.end_year?.toString().includes(input.toLowerCase()) ||
        interaction.irl_name.toLowerCase().includes(input.toLowerCase()) ||
        (interaction.usr_first_name + " " + interaction.usr_last_name)
          .toLowerCase()
          .includes(input.toLowerCase())
    );

    setDisplayInteractions(filterInteractions);
  };

  useEffect(() => {
    

    APIClient.getGroup(context.authUser.usr_id, groupId)
      .then((group) => {
        setGroup(group[0]);
      })
      .catch(() => {
        IDBHelper.getGroupsById(groupId)
        .then(idb_group =>{
          setGroup(idb_group);
        })
        .catch((error) => {
          console.log(error);
        });
        //setError("Error");
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
      //console.log("offline ",idb_interaction)
      setDisplayInteractions(idb_interaction);
      setInteractions(idb_interaction);
    
    APIClient.getUserGroupInteractions(context.authUser.usr_id, groupId)
      .then((interactions) => {
        //console.log(interactions)
        setDisplayInteractions(interactions);
        setInteractions(interactions);
      })
      .catch((e) => {

      });
  }, []);

  
  if (!interactions || !group)
    return (
      <ReactLoading className={classes.loading} type={"bars"} color={"grey"} />
    );
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <React.Fragment>
      <Navigation search={true} searchInput={handleSearch} history={history}>
        {" "}
      </Navigation>

      <Card className={classes.root}>
        <Typography component={"div"}>
          <CardHeader
            title={<Typography variant="h4"> {group?.grp_name} </Typography>}
            action={
              <IconButton
                aria-label="settings"
                onClick={() => {
                  history.push(`/edit-group/${group?.grp_id}`);
                }}
              >
                <EditIcon />
              </IconButton>
            }
            subheader={group ? calcTimePeriod(group) : ""}
          />
        </Typography>
      </Card>

      <InteractionsTable
        data={displayInteractions}
        count={context.interactionsCount}
      />
    </React.Fragment>
  );
}
