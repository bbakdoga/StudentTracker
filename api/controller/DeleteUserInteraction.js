var db = require("../database/db");
var helper = require("../database/helper");
var queries = require("../database/GetQuery");

const DeleteUserInteraction = async (req, res, next) => {
  const authUserId = req.params.authUserId;
  const interactionId = req.params.interactionId;

  try {

    const DeleteInteractionQueries = queries.DeleteUserInteraction();

    // Deletes Note associated with Interaction
    await db.query(DeleteInteractionQueries[0], [
      interactionId,
      authUserId,
    ]);

    // Deletes Interaction
    const rows = await db.query(DeleteInteractionQueries[1], [
      interactionId,
      authUserId,
    ]);

    const data = helper.emptyOrRows(rows);
    res.send(data);
  } catch (err) {
    console.error(`Error while getting group `, err.message);
    next(err);
  }
};

module.exports = DeleteUserInteraction;
