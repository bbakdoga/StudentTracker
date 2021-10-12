var createError = require("http-errors");
const db = require("../database/db");
const helper = require("../database/helper");
var queries = require("../database/GetQuery");

const PostUserGroup = async (req, res, next) => {
  const group = req.body;
  const authUserId = req.params.authUserId;

  try {
    const rows = await db.query(queries.PostUserGroup(), [
      group.grp_gtp_id,
      authUserId,
      group.grp_name,
      group.grp_section ? group.grp_section : null,
      group.grp_start_prd_id,
      group.start_year,
      group.grp_end_prd_id ? group.grp_end_prd_id : null,
      group.end_year ? group.end_year : null,
    ]);

    const newGroup = await db.query(queries.GetUserGroupQuery(), [
      rows.insertId,
      authUserId,
    ]);

    const data = helper.emptyOrRows(newGroup);
    res.send(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = PostUserGroup;
