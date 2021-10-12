import React, { useContext } from "react";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import calcTimePeriod from "../../../util/TimePeriodCalculation";
import { userContext } from "../../../util/StudentTrackerContext";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";



const useRowStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.getContrastText("#d3d3d3"),
    backgroundColor: "lightgray",
  },
}));

const InteractionBody = (props) => {
  const { interaction } = props;
  const context = useContext(userContext);
  const classes = useRowStyles();

  return (
    <TableBody>
      {interaction?.map((interaction) => (
        <TableRow key={interaction.int_id}>
          <TableCell align="center">
            <Avatar className={classes.avatar}>
              {interaction.usr_first_name.toUpperCase().charAt(0)}
            </Avatar>
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            <Button>
              <Link
                to={{
                  pathname: `users/${interaction.usr_id}`,
                }}
                style={{
                  textTransform: "none",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <Typography>
                  {interaction.usr_first_name + " " + interaction.usr_last_name}
                </Typography>
              </Link>
            </Button>
          </TableCell>
          <TableCell align="center">
            {interaction.usr_unity_id}
          </TableCell>
          <TableCell align="center">{interaction.usr_email}</TableCell>
          <TableCell align="center">{interaction.irl_name}</TableCell>
          <TableCell align="center">{calcTimePeriod(interaction)}</TableCell>
          <TableCell align="center">
            {context.interactionsCount[interaction.usr_id]}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default InteractionBody;