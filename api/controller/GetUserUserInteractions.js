const db = require("../database/db");
const helper = require("../database/helper");
var queries = require("../database/GetQuery");

const GetUserUserInteractions = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const authUserId = req.params.authUserId;

    const rows = await db.query(queries.GetUserUserInteractionsQuery(), [
      userId,
      authUserId,
    ]);
    const data = helper.emptyOrRows(rows);

    res.send(data);
  } catch (err) {
    console.error(`Error while getting student `, err.message);
    next(err);
  }
};

module.exports = GetUserUserInteractions;
