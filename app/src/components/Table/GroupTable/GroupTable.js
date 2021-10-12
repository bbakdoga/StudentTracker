import React from "react";
import Table from "@material-ui/core/Table";
import GroupHeader from "./GroupHeader";
import GroupBody from "./GroupBody";

const GroupTable = (props) => {
  const { groups } = props;
  const { interactions } = props;

  return (
    <Table>
      <GroupHeader></GroupHeader>
      <GroupBody groups={groups} interactions={interactions}></GroupBody>
    </Table>
  );
};

export default GroupTable;
