
const db = require("../database/db");
const helper = require("../database/helper");
var queries = require("../database/GetQuery");

const UpdateUserGroup = async (req, res, next) => {
  const authUserId = req.params.authUserId;
  const interactionId = req.params.interactionId;
  const noteId = req.params.noteId;
  const note = req.body;

  try {
    console.log("infiltrated backedn");
    await db.query(queries.UpdateUserNote(), [
      note.not_title,
      note.not_text,
      interactionId,
      authUserId,
      noteId
    ]);

    const updatedGroup = await db.query(queries.GetUserNotes(), [interactionId, authUserId]);

    const data = helper.emptyOrRows(updatedGroup);
    console.log(data);
    res.send(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = UpdateUserGroup;
