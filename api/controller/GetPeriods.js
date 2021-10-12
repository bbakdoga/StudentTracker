const db = require("../database/db");
const helper = require("../database/helper");
var queries = require("../database/GetQuery");

const GetPeriods = async (req, res, next) => {
  try {
    const rows = await db.query(queries.GetPeriodsQuery());
    const data = helper.emptyOrRows(rows);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = GetPeriods;
