var db = require("../database/db");
var helper = require("../database/helper");
var queries = require("../database/GetQuery");

const GetUserGroups = async (req, res, next) => {
  const authUserId = req.params.authUserId;
  try {
    const rows = await db.query(queries.GetUserGroupsQuery(), [authUserId]);
    const data = helper.emptyOrRows(rows);
    // console.log("data");
    // console.log(JSON.stringify(data));
    res.send(data);
  } catch (err) {
    console.error(`Error while getting group `, err.message);
    next(err);
  }
};

module.exports = GetUserGroups;
