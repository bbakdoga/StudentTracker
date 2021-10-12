var db = require("../database/db");
var helper = require("../database/helper");
var queries = require("../database/GetQuery");

const DeleteUserNote = async (req, res, next) => {
  const authUserId = req.params.authUserId;
  const interactionId = req.params.interactionId;
  const noteId = req.params.noteId;

  try {
    // Deletes Note associated with Interaction
    const rows = await db.query(queries.DeleteUserNote(), [
      interactionId,
      noteId,
      authUserId,
    ]);

    const data = helper.emptyOrRows(rows);
    res.send(data);
  } catch (err) {
    console.error(`Error while getting group `, err.message);
    next(err);
  }
};

module.exports = DeleteUserNote;
