import React, { useEffect, useState } from "react";

import IconButton from "@material-ui/core/IconButton";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";

import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import InteractionTable from "../InteractionTable/InteractionTable";

import calcTimePeriod from "../../../util/TimePeriodCalculation";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { groups } = props;
  const { interactions } = props;
  const classes = useRowStyles();

  // Variable for opening and closing interaction dropdown
  const [openInteraction, setOpenInteraction] = useState(false);

  // Returns Table including dropdown and modal code
  return (
    <React.Fragment>
      <TableRow
        style={openInteraction ? { backgroundColor: "lightgray" } : {}}
        className={classes.root}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenInteraction(!openInteraction)}
          >
            {openInteraction ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          <Button>
            <Link
              to={{
                pathname: `/groups/${groups.grp_id}`,
              }}
              style={{
                textTransform: "none",
                textDecoration: "none",
                color: "black",
              }}
            >
              <Typography>
                {groups.grp_section
                  ? groups.grp_name +
                    " (" +
                    groups.grp_section.toString().padStart(3, "0") +
                    ")"
                  : groups.grp_name}
              </Typography>
            </Link>
          </Button>
        </TableCell>
        <TableCell align="center">{calcTimePeriod(groups)}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openInteraction} timeout="auto" unmountOnExit>
            <Box margin="auto">
              <InteractionTable
                interaction={interactions[groups.grp_id]}
              ></InteractionTable>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const GroupBody = (props) => {
  const { groups } = props;
  const { interactions } = props;

  // Sorts Groups Array by combining the start period id and
  // the start year and ordering them most recent to oldest

  groups.sort((a, b) => {
    return (
      b.grp_start_prd_id + b.start_year - (a.grp_start_prd_id + a.start_year)
    );
  });

  return (
    <TableBody>
      {groups.map((group) => (
        <Row key={group.grp_id} groups={group} interactions={interactions} />
      ))}
    </TableBody>
  );
};

export default GroupBody;
