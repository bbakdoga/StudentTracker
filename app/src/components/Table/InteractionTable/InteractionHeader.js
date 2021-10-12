import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";

const useRowStyles = makeStyles({
  titles: {
    backgroundColor: "dimgray",
  },
  titlesText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});

const InteractionHeader = () => {
  const classes = useRowStyles();

  return (
    <TableHead className={classes.titles}>
      <TableRow>
        <TableCell></TableCell>
        <TableCell className={classes.titlesText} align="center">
          Name
        </TableCell>
        <TableCell className={classes.titlesText} align="center">
          Unity
        </TableCell>
        <TableCell className={classes.titlesText} align="center">
          Email
        </TableCell>
        <TableCell className={classes.titlesText} align="center">
          Role
        </TableCell>
        <TableCell className={classes.titlesText} align="center">
          Period
        </TableCell>
        <TableCell className={classes.titlesText} align="center">
          Total Interactions
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default InteractionHeader;
