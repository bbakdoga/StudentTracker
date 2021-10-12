import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import GroupIcon from "@material-ui/icons/Group";
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

const GroupHeader = () => {
  const classes = useRowStyles();

  return (
    <TableHead className={classes.titles}>
          <TableRow>
            <TableCell className={classes.titlesText}>
              <GroupIcon aria-label="expand row" size="small" />{" "}
            </TableCell>
            <TableCell className={classes.titlesText} align="center">
              Group
            </TableCell>
            <TableCell className={classes.titlesText} align="center">
              Time Period
            </TableCell>
          </TableRow>
        </TableHead>
  );
};

export default GroupHeader;
