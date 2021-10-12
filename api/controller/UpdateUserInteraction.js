var createError = require("http-errors");
const db = require("../database/db");
var queries = require("../database/GetQuery");

let authUserId;
let interactionId;
let groupId;

const evalInteraction = async (interaction) => {
  //Import Queries from files
  const updateQueries = queries.UpdateInteraction();
 
  // Update Interaction user
  await db.query(updateQueries[0], [
    interaction.usr_unity_id,
    interaction.usr_email,
    interaction.usr_first_name,
    interaction.usr_preferred_name ? interaction.usr_preferred_name : null,
    interaction.usr_last_name,
    interaction.usr_preferred_pronouns
      ? interaction.usr_preferred_pronouns
      : null,
    interaction.usr_id,
  ]);


 
  // Creat new interaction with existing user or new user
  await db.query(updateQueries[2], [
    interaction.usr_id,
    groupId,
    interaction.int_irl_id,
    interaction.int_start_prd_id,
    interaction.start_year,
    interaction.int_end_prd_id ? interaction.int_end_prd_id : null,
    interaction.end_year ? interaction.end_year : null,
    interactionId,
    authUserId,
  ]);

  const updatedInteraction = await db.query(queries.GetInteractionQuery(), [
    interactionId,
    authUserId,
  ]);

  return updatedInteraction;
};

const UpdateUserInteractions = async (req, res, next) => {
  const interaction = req.body;
  authUserId = req.params.authUserId;
  interactionId = req.params.interactionId;
  groupId = req.params.groupId;

  const originalInteraction = await db.query(queries.GetInteractionQuery(), [
    interactionId,
    authUserId,
  ]);

  if (originalInteraction.length == 0) {
    return next(createError(500, "No Interaction Found"));
  }

  try {
    const ret = await evalInteraction(interaction);

    res.send(ret);
  } catch (err) {
    return next(err);
  }
};

module.exports = UpdateUserInteractions;
