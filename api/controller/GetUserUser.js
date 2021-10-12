const db = require("../database/db");
const helper = require("../database/helper");
var queries = require("../database/GetQuery");

const GetUserUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const rows = await db.query(queries.GetUserUserQuery(), [userId]);
    const data = helper.emptyOrRows(rows);

    res.send(data);
  } catch (err) {
    console.error(`Error while getting student `, err.message);
    next(err);
  }
};

module.exports = GetUserUser;
