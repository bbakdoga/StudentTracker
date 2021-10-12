const db = require("../database/db");
const helper = require("../database/helper");
var queries = require("../database/GetQuery");

const PostUserNote = async (req, res, next) => {
  const note = req.body;

  try {
    const rows = await db.query(queries.PostUserNote(), [
      note.not_int_id,
      note.not_title,
      note.not_text
    ]);


    const data = helper.emptyOrRows(rows);
    res.send(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = PostUserNote;
