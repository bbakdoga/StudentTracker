var createError = require("http-errors");
const db = require("../database/db");
const helper = require("../database/helper");
var queries = require("../database/GetQuery");

var env = process.env;

const GetUser = async (req, res, next) => {
  const unityId = env.AUTHENTICATED_USR;
  try {
    const rows = await db.query(queries.GetUserQuery(), [unityId]);
    const data = helper.emptyOrRows(rows);

    if(data.length == 0){
      return next(createError(500, "No user found"));
    }

    res.send(data);
  } catch (err) {
    console.error(`Error while getting student `, err.message);
    next(err);
  }
};

module.exports = GetUser;
