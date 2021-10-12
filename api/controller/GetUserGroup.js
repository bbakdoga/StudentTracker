var db = require("../database/db");
var helper = require("../database/helper");
var queries = require("../database/GetQuery");

const GetUserGroup = async (req, res, next) => {
  const groupId = req.params.groupId;
  const authUserId = req.params.authUserId;
  try {
    const rows = await db.query(queries.GetUserGroupQuery(), [
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

module.exports = GetUserGroup;
