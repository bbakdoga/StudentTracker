var createError = require("http-errors");
const db = require("../database/db");
var queries = require("../database/GetQuery");

let authUser;

const evalInteraction = async (interaction) => {
  // Try to get userId from unity id
  const user = await db.query(queries.GetUserUnity(), [
    interaction.usr_unity_id,
  ]);
  let newUser;

  // If no user matched unity id create a new user
  if (!user || user.length == 0) {
    newUser = await db.query(queries.CreateUser(), [
      interaction.usr_unity_id,
      interaction.usr_email,
      interaction.usr_first_name,
      interaction.usr_preferred_name ? interaction.usr_preferred_name : null,
      interaction.usr_last_name,
      interaction.usr_preferred_pronouns
        ? interaction.usr_preferred_pronouns
        : null,
    ]);
  }

  // If user exists already update its data
  if (user[0]) {
    // Update Interaction user
    await db.query(queries.UpdateInteraction()[0], [
      interaction.usr_unity_id,
      interaction.usr_email,
      interaction.usr_first_name,
      interaction.usr_preferred_name ? interaction.usr_preferred_name : null,
      interaction.usr_last_name,
      interaction.usr_preferred_pronouns
        ? interaction.usr_preferred_pronouns
        : null,
      user[0].usr_id,
    ]);
  }

  // Creat new interaction with existing user or new user
  const newInteractionId = await db.query(queries.PostUserInteraction(), [
    newUser ? newUser.insertId : user[0].usr_id,
    interaction.grp_id,
    interaction.int_irl_id,
    interaction.int_start_prd_id,
    interaction.start_year,
    interaction.int_end_prd_id ? interaction.int_end_prd_id : null,
    interaction.end_year ? interaction.end_year : null,
  ]);

  // If note title and text exist create new note for interaction
  if (interaction.not_title && interaction.not_text) {
    await db.query(queries.CreateNote(), [
      newInteractionId.insertId,
      interaction.not_title,
      interaction.not_text,
    ]);
  }

  const newInteraction = await db.query(queries.GetInteractionQuery(), [
    newInteractionId.insertId,
    authUser,
  ]);

  return newInteraction;
};

const PostUserInteractions = async (req, res, next) => {
  const interaction = req.body;
  authUser = req.params.authUserId;

  let addedInteractions = [];

  try {
    await Promise.all(
      interaction.map(async (interaction) => {
        const ret = await evalInteraction(interaction);
        if (ret) addedInteractions.push(ret[0]);
      })
    );

    res.send(addedInteractions);
  } catch (err) {
    return next(err);
  }
};

module.exports = PostUserInteractions;
