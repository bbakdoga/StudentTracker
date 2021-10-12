const db = require("../database/db");
const helper = require("../database/helper");
var queries = require("../database/GetQuery");

const GetUserNotes = async (req, res, next) => {
  const authUserId = req.params.authUserId;
  const interactionId = req.params.interactionId;

  try {
    const rows = await db.query(queries.GetUserNotes(), [interactionId, authUserId]);
    const data = helper.emptyOrRows(rows);

    res.send(data);
  } catch (err) {
    console.error(`Error while getting student `, err.message);
    next(err);
  }
};

module.exports = GetUserNotes;