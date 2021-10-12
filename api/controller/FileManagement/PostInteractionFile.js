const db = require("../../database/db");
const helper = require("../../database/helper");
var queries = require("../../database/GetQuery");
const uploadFile = require("../../util/FileUploadMiddleware");

const multer = require("multer");
const textUpload = multer();

const PostInteractionFile = async (req, res) => {
  
  await uploadFile(req, res);
  await textUpload.none();
  
  const file = req.body;

  try {
    await db.query(queries.PostInteractionFile(), [
      file.fil_int_id,
      file.fil_title,
      file.fil_description,
      file.fil_name,
      req.file.originalname,
    ]);

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });

  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file. ${err}`,
    });
  }
};

module.exports = PostInteractionFile;
