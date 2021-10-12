var db = require("../database/db");
var helper = require("../database/helper");
var queries = require("../database/GetQuery");

const DeleteUserGroup = async (req, res, next) => {
  const authUserId = req.params.authUserId;
  const groupId = req.params.groupId;

  try {

    const DeleteGroupQueries = queries.DeleteUserGroup();

    // Deletes Notes associated with Interactions
    await db.query(DeleteGroupQueries[0], [
      groupId,
      authUserId,
    ]);

    // Deletes Interactions associated with the group
    await db.query(DeleteGroupQueries[1], [
      groupId,
      authUserId,
    ]);

    // Deletes group
    const rows = await db.query(DeleteGroupQueries[2], [
      groupId,
      authUserId,
    ]);

    const data = helper.emptyOrRows(rows);
    res.send(data);
  } catch (err) {
    console.error(`Error while getting group `, err.message);
    next(err);
  }
};

module.exports = DeleteUserGroup;
