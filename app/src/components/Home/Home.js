import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import APIClient from "../../api/APIClient";
import GroupTable from "../Table/GroupTable/GroupTable";
import { userContext } from "../../util/StudentTrackerContext";
import Navigation from "../Navigation/Navigation";
import IDBHelper from "../../db-helper";

const useRowStyles = makeStyles({
  container: {
    marginTop: "20px",
    margin: "auto",
    width: "85%",
  },
});

export default function Home(props) {
  const classes = useRowStyles();
  const [groups, setGroups] = useState(null);
  const [displayGroups, setDisplayGroups] = useState([]);
  const [interactions, setInteractions] = useState();
  const [displayInteractions, setDisplayInteractions] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const context = useContext(userContext);
  const history = props.history;

  const handleSearchInput = (input) => {
    //Reset display groups and interactions
    setDisplayGroups(groups);
    setDisplayInteractions(interactions);

    //Filter interactions based on input
    let filterGroups = groups.filter(
      (groups) =>
        groups.grp_name.toLowerCase().includes(input.toLowerCase()) ||
        groups.start_period.toLowerCase().includes(input.toLowerCase()) ||
        groups.start_year.toString().includes(input.toLowerCase()) ||
        groups.end_period?.toLowerCase().includes(input.toLowerCase()) ||
        groups.end_year?.toString().includes(input.toLowerCase())
    );

    //If groups match input display groups and exit search function
    if (filterGroups.length > 0) {
      setDisplayGroups(filterGroups);
      return;
    }

    //Flatten Interactions
    let flatint = Object.keys(interactions).reduce((acc, curVal) => {
      return acc.concat(interactions[curVal]);
    }, []);

    //Filter Interactions on search input
    let filterInteractions = flatint.filter(
      (interaction) =>
        interaction.usr_first_name
          .toLowerCase()
          .includes(input.toLowerCase()) ||
        interaction.usr_last_name.toLowerCase().includes(input.toLowerCase()) ||
        interaction.usr_unity_id.toLowerCase().includes(input.toLowerCase()) ||
        (interaction.usr_first_name + " " + interaction.usr_last_name)
          .toLowerCase()
          .includes(input.toLowerCase())
    );

    //Filter groups based on interactions that have been filtered
    filterGroups = groups.filter((group) => {
      let fil = filterInteractions.filter((interaction) => {
        if (interaction.grp_id == group.grp_id) return group;
      });

      if (fil.length > 0) return true;
    });

    //Re expand interactions list
    filterInteractions = filterInteractions.reduce((acc, curVal) => {
      if (!acc[curVal.grp_id]) {
        acc[curVal.grp_id] = [];
      }
      acc[curVal.grp_id].push(curVal);
      return acc;
    }, {});

    setDisplayInteractions(filterInteractions);
    setDisplayGroups(filterGroups);
  };

  useEffect(() => {
    var dbgroups;
    IDBHelper.getGroups().then((groups) => {
      dbgroups = groups;
      setGroups(groups);
      return IDBHelper.getTempGroups();
    })
    .then((tempGroups)=>{
      var dispGroups = dbgroups.concat(tempGroups)
      setGroups(dispGroups);
      setDisplayGroups(dispGroups);
      //post to back end from here  
      tempGroups.forEach((element) => {
        APIClient.postUserGroup(context.authUser.usr_id, element)
        .then(()=>{
          console.log("Deleting Temp Groups")
          IDBHelper.deleteTempGroups(element);
        })
        .catch((error)=>{
          console.log(error)
        })
        
        });
    }).then( () =>{
      APIClient.getUserGroups(context.authUser.usr_id)
      .then((databaseGroups) => {
    //console.log(databaseGroups);
        setGroups(databaseGroups);
        setDisplayGroups(databaseGroups);
        setIsLoading(false);
      }) 
     }
    )

    APIClient.getPeriods()
    .then( periodsIDB =>{
      periodsIDB.forEach(element => IDBHelper.savePeriods(element))      
    })
    .catch((error) => {
      console.log(error);
    });

    APIClient.getGroupTypes()
      .then(groupType =>{
        groupType.forEach(element => IDBHelper.saveGroupType(element))
      }).catch((error) => {
        console.log(error);
      });

//transfering interaction from idb to maria db
    IDBHelper.getTempInteractions().then(temp_int =>{
      temp_int.forEach((element)=>{
        APIClient.postUserInteraction(context.authUser.usr_id, element)
        .then(()=>{
          console.log("Deleting Temp Interactions")
          IDBHelper.deleteTempInteractions(element);})
          .catch((error)=>{

          })
      });
    })

    //save notes in IDB from Maria DB
    IDBHelper.getInteractions().then(idb_int =>{
      idb_int.forEach(int =>{
        APIClient.getNotes(context.authUser.usr_id, int.int_id).then(notes =>{
          notes.forEach(idb_note =>{
            IDBHelper.saveNotes(idb_note);
          })
        })
        .catch(error =>{

        })
      })
    })

    // transfer temp notes to maria DB
    IDBHelper.getTempNotes().then(temp_note => {
      if (temp_note.length != 0){
        temp_note.forEach(note =>{
          APIClient.postInteractionNote(context.authUser.usr_id, note).then(()=>{
            IDBHelper.deleteTempNote(note);
          }).catch(error => {

          })
        })
      }
    })
    

    APIClient.getUserGroups(context.authUser.usr_id)
      .then((databaseGroups) => {
        //console.log(databaseGroups);
        // setGroups(databaseGroups);
        // setDisplayGroups(databaseGroups);
        // setIsLoading(false);
        databaseGroups.forEach(element => IDBHelper.saveGroups(element));
        return databaseGroups;
      })
      .then((groups) =>
        Promise.all(
          groups.map((group) =>
            APIClient.getUserGroupInteractions(context.authUser.usr_id, group.grp_id)
          )
        )
      )
      .then((interactionArray) => {
        //console.log(interactionArray)
        interactionArray = [].concat.apply([], interactionArray); // flatten arrays
        //iterate through array. Each record will be an interaction in the system
        
        let interactions = interactionArray.reduce((acc, curVal) => {
          if (!acc[curVal.grp_id]) {
            acc[curVal.grp_id] = [];
          }
          acc[curVal.grp_id].push(curVal);
          return acc;
        }, {});
        setInteractions(interactions);
        setDisplayInteractions(interactions);
//        console.log(interactions.length, interactions);

        for (const interaction in interactions) {
          //console.log(interactions[interaction]);
          interactions[interaction].forEach(element => IDBHelper.saveInteractions(element));
        }

        //iterate through array. Count number of interactions per user
        let interactionsCount = interactionArray.reduce((acc, curVal) => {
          if (!acc[curVal.usr_id]) {
            acc[curVal.usr_id] = 0;
          }
          acc[curVal.usr_id]++;
          return acc;
        }, {});
        context.setInteractionsCount(interactionsCount);
        return interactions;
      })
      .catch((e) => {
        var temp_int = [];
        IDBHelper.getInteractions().then(interactionArray => {
          IDBHelper.getTempInteractions().then(temp =>{
            temp_int = temp_int.concat(temp);
          })
          var dispInt;
          if (temp_int.length !=0){
            dispInt = interactionArray.concat(temp_int);
          }
           dispInt = interactionArray;
          let interactions = dispInt.reduce((acc, curVal) => {
            if (!acc[curVal.grp_id]) {
              acc[curVal.grp_id] = [];
            }
            acc[curVal.grp_id].push(curVal);
            return acc;
          }, {});
          setInteractions(interactions);
          setDisplayInteractions(interactions);
  
          //iterate through array. Count number of interactions per user
          let interactionsCount = dispInt.reduce((acc, curVal) => {
            if (!acc[curVal.usr_id]) {
              acc[curVal.usr_id] = 0;
            }
            acc[curVal.usr_id]++;
            return acc;
          }, {});
          context.setInteractionsCount(interactionsCount);
          return interactions;
      })
        // console.log(e);
        // console.log(e.stack);
        // setIsLoading(false);
        
      });
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (!groups) return null;

  return (
    <React.Fragment>
      <Navigation search={true} searchInput={handleSearchInput} history={history}></Navigation>
      <TableContainer className={classes.container} component={Paper}>
        <GroupTable
          groups={displayGroups}
          interactions={displayInteractions}
        ></GroupTable>
      </TableContainer>
    </React.Fragment>
  );
}