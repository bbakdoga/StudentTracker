const db = require("../../database/db");
var queries = require("../../database/GetQuery");

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

    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  } catch (err) {
    console.error(`Error while getting student `, err.message);
    next(err);
  }
};

module.exports = GetInteractionFile;
