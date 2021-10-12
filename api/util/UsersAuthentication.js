var createError = require("http-errors");

const db = require("../database/db");
var queries = require("../database/GetQuery");

var env = process.env;

let userID;
let user;

const UsersAuthentication = async function (req, res, next) {
  try {
    if (!userID || userID !== req.params.authUserId) {
      userID = req.params.authUserId;
      user = await db.query(queries.GetUserUserQuery(), [userID]);
    }

    if (user[0].usr_unity_id === env.AUTHENTICATED_USR) {
      return next();
    } else {
      return next(createError(401, "Invalid Authentication."));
    }
  } catch (err) {
    return next(createError(401, "Invalid Authentication."));
  }
};

module.exports = UsersAuthentication;
