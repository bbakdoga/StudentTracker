const db = require("../database/db");
const helper = require("../database/helper");
var queries = require("../database/GetQuery");

const GetUserGroupInteractions = async (req, res, next) => {
  const groupId = req.params.groupId;
  const authUserId = req.params.authUserId;
  try {
    const rows = await db.query(queries.GetUserGroupInteractionsQuery(), [
      groupId,
      authUserId,
    ]);
    const data = helper.emptyOrRows(rows);

    res.send(data);
  } catch (err) {
    console.error(`Error while getting student `, err.message);
    next(err);
  }
};

module.exports = GetUserGroupInteractions;
