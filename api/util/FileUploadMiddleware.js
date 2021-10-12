const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const fs = require("fs");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/content/");
  },
  filename: (req, file, cb) => {
    let file_num = 1;
    let tempfile = file.originalname;
    while (fs.existsSync(`${__basedir}/content/${tempfile}`)) {
      tempfile = file.originalname;
      const split = file.originalname.split(".");
      tempfile = `${split[0]} (${file_num++}).${split[1]}`;
      console.log(file.originalname);
    }
    file.originalname = tempfile;
    console.log("file! " + tempfile);
    cb(null, tempfile);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
