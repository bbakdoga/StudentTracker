import React, { useContext, useEffect, useState } from "react";
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
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import CardHeader from "@material-ui/core/CardHeader";
import calcTimePeriod from "../../util/TimePeriodCalculation";
import { userContext } from "../../util/StudentTrackerContext";
import Navigation from "../Navigation/Navigation";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import Note from "../Note/Note";
import IDBHelper from "../../db-helper";
import File from "../File/File";
import AttachFileIcon from "@material-ui/icons/AttachFile";

// Defines the styles for the Interaction table.
const useStyles = makeStyles({
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
});

/**
 * User component. Handles user realted functionality.
 * @param props for the user data.
 */
function User(props) {
  const classes = useStyles();
  if (!props.data) return null;

  return (
    <Card className={classes.root}>
      <Typography component={"div"}>
        <CardHeader
          avatar={
            <PersonIcon
              style={{ fontSize: 80 }}
              className={classes.userName}
            ></PersonIcon>
          }
          title={
            <Typography variant="h4">
              {" "}
              {props.data.usr_first_name + " " + props.data.usr_last_name}{" "}
            </Typography>
          }
          subheader={
            <div>
              Email:{" "}
              <u>
                <font color="blue">{props.data.usr_email}</font>
              </u>
              <br></br>
              Unity ID: {props.data.usr_unity_id}
            </div>
          }
        />
      </Typography>
    </Card>
  );
}

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
            <TableCell className={classes.titlesText} align="center">
              Interaction
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
          </TableRow>
        </TableHead>
        <TableBody>
          {interactions?.map((interaction) => {
            return (
              <TableRow key={interaction.int_id}>
                <TableCell align="center">
                  <Button>
                    <Link
                      to={{
                        pathname: `/groups/${interaction.grp_id}`,
                      }}
                      style={{
                        textTransform: "none",
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      {interaction.grp_name}
                    </Link>
                  </Button>
                </TableCell>
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
 * Main component. Calls user and interaction table components.
 */
export default function UserProfile(props) {
  let match = useRouteMatch();
  const [interactions, setInteractions] = useState([]);
  const [displayInteractions, setDisplayInteractions] = useState([]);
  const [student, setStudent] = useState(null);
  const [loadingStudent, isLoadingStudent] = useState(null);
  const [loadingInteractions, isLoadingInteractions] = useState(null);
  const [studentError, setStudentError] = useState(null);
  const [interactionsError, setInteractionsError] = useState(null);
  const context = useContext(userContext);
  const userId = match.params.userId;
  const history = props.history;

  const handleSearch = (input) => {
    //Reset Filter
    setDisplayInteractions(interactions);

    let filterInteractions = interactions.filter(
      (interaction) =>
        interaction.grp_name.toLowerCase().includes(input.toLowerCase()) ||
        interaction.start_period.toLowerCase().includes(input.toLowerCase()) ||
        interaction.start_year.toString().includes(input.toLowerCase()) ||
        interaction.end_period?.toLowerCase().includes(input.toLowerCase()) ||
        interaction.end_year?.toString().includes(input.toLowerCase()) ||
        interaction.irl_name.toLowerCase().includes(input.toLowerCase())
    );

    setDisplayInteractions(filterInteractions);
  };

  useEffect(() => {
    isLoadingInteractions(true);
    isLoadingStudent(true);
    if (context && context.authUser.usr_id) {
      //console.log("We got to this point");

      IDBHelper.getInteractions().then(idb_int =>{
        var temp = [];
        idb_int.forEach(element =>{
          if (element.usr_id == userId){
            temp.push(element);
          }
        })
        setInteractions(temp);
        setDisplayInteractions(temp);
      })
      .then(isLoadingInteractions(false))
      .catch((error) => {
        console.log(error);
      })

      
      
      APIClient.getUserInteractions(context.authUser.usr_id, userId)
        .then((interactions) => {
          //console.log(interactions);
          setInteractions(interactions);
          setDisplayInteractions(interactions);
        })
        .then(isLoadingInteractions(false))
        .catch((e) => {
          // console.log(e);
          // console.log(e.stack);
          // setInteractionsError(e);
          // isLoadingInteractions(false);
        });


      APIClient.getUser(context.authUser.usr_id, userId)
        .then((user) => {
          IDBHelper.saveUsers(user)
          .then().catch((error) => {
            console.log("error");
          });
          setStudent(user);
        })    
        .then(isLoadingStudent(false))
        .catch((e) => {
          IDBHelper.getUsersById(userId)
          .then(idb_student => {
            setStudent([idb_student]);
          })
          .then(isLoadingStudent(false))
          .catch((error) => {
            console.log(error);
          })    
          // console.log(e);
          // console.log(e.stack);
          // setStudentError(e);
          // isLoadingStudent(false);
        });
    }
  }, [context.authUser]);

  if (loadingStudent || loadingInteractions) return <h1>Loading...</h1>;
  if (studentError || interactionsError) return <pre>Error</pre>;

  return (
    <React.Fragment>
      <Navigation
        search={true}
        searchInput={handleSearch}
        history={history}
      ></Navigation>
      <User data={student ? student[0] : null} />
      <InteractionsTable data={displayInteractions} />
    </React.Fragment>
  );
}
