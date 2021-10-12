const db = require("../../database/db");
var queries = require("../../database/GetQuery");

const GetInteractionFile = async (req, res, next) => {
  const authUserId = req.params.authUserId;
  const interactionId = req.params.interactionId;

  try {
    const files = await db.query(queries.GetInteractionFiles(), [
      interactionId,
      authUserId,
    ]);
    
    res.send(files)
  } catch (err) {
    console.error(`Error while getting student `, err.message);
    next(err);
  }
};

module.exports = GetInteractionFile;
