const db = require("../database/db");
const helper = require("../database/helper");
var queries = require("../database/GetQuery");

const GetInteractionRoles = async (req, res, next) => {
  try {
    const rows = await db.query(queries.GetInteractionRolesQuery());
    const data = helper.emptyOrRows(rows);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

module.exports = GetInteractionRoles;
