UPDATE user
SET usr_unity_id = ?,
  usr_email = ?,
  usr_first_name = ?,
  usr_preferred_name = ?,
  usr_last_name = ?,
  usr_preferred_pronouns = ?
WHERE usr_id = ?;