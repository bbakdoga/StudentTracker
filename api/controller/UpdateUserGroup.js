var createError = require("http-errors");
const db = require("../database/db");
const helper = require("../database/helper");
var queries = require("../database/GetQuery");

const UpdateUserGroup = async (req, res, next) => {

  
  const group = req.body;
  const authUserId = req.params.authUserId;
  const groupId = req.params.groupId;

  try {
    await db.query(queries.UpdateUserGroup(), [
      group.grp_gtp_id,
      group.grp_name,
      group.grp_section ? group.grp_section : null,
      group.grp_start_prd_id,
      group.start_year,
      group.grp_end_prd_id ? group.grp_end_prd_id : null,
      group.end_year ? group.end_year : null,
      groupId,
      authUserId,
    ]);

    const updatedGroup = await db.query(queries.GetUserGroupQuery(), [
      groupId,
      authUserId,
    ]);

    const data = helper.emptyOrRows(updatedGroup);
    res.send(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = UpdateUserGroup;
