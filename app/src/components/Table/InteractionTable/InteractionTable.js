import React from "react";
import Table from "@material-ui/core/Table";
import InteractionHeader from "./InteractionHeader";
import InteractionBody from "./InteractionBody";

const InteractionTable = (props) => {

  const { interaction } = props;

  if(!interaction) return null;

  return (
    <Table size="small" aria-label="purchases">
      <InteractionHeader></InteractionHeader>
      <InteractionBody key={interaction.int_grp} interaction={interaction}></InteractionBody>
    </Table>
  );
};

export default InteractionTable;
