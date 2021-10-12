const db = require("../database/db");
const helper = require("../database/helper");
var queries = require("../database/GetQuery");

const GetGroupTypes = async (req, res, next) => {
  try {
    const rows = await db.query(queries.GetGroupTypesQuery());
    const data = helper.emptyOrRows(rows);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = GetGroupTypes;
