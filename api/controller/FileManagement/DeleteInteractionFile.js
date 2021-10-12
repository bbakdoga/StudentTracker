const db = require("../../database/db");
var queries = require("../../database/GetQuery");
const fs = require("fs");

const GetInteractionFile = async (req, res, next) => {
  const authUserId = req.params.authUserId;
  const interactionId = req.params.interactionId;
  const fileId = req.params.fileId;
  const directoryPath = __basedir + "/content/";

  try {
    const file = await db.query(queries.GetInteractionFile(), [
      interactionId,
      authUserId,
      fileId,
    ]);

    const fileName = file[0].fil_real_name;
    fs.unlinkSync(directoryPath + fileName);

    const delete_file = await db.query(queries.DeleteInteractionFile(), [
      interactionId,
      authUserId,
      fileId,
    ]);

    res.send(delete_file);
  } catch (err) {
    console.error(`Error while getting student `, err.message);
    next(err);
  }
};

module.exports = GetInteractionFile;
