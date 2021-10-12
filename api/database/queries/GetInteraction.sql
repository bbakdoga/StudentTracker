SELECT 
  interaction.int_id,
  student_tracker.group.grp_id,
  user.usr_id,
  student_tracker.group.grp_name,
  user.usr_first_name,
  user.usr_last_name,
  user.usr_email,
  user.usr_unity_id,
  interaction.int_irl_id,
  interaction_role.irl_name,
  note.not_title,
  note.not_text,
  interaction.int_start_prd_id,
  start_period.prd_name as start_period,
  interaction.int_start_year as start_year,
  interaction.int_end_prd_id,
  end_period.prd_name as end_period,
  interaction.int_end_year as end_year
FROM student_tracker.group
  JOIN interaction ON interaction.int_grp_id = group.grp_id
  JOIN user ON user.usr_id = interaction.int_usr_id
  JOIN interaction_role on interaction.int_irl_id = interaction_role.irl_id
  LEFT JOIN note on note.not_int_id = interaction.int_id
  JOIN period as start_period ON interaction.int_start_prd_id = start_period.prd_id
  LEFT JOIN period as end_period ON interaction.int_end_prd_id = end_period.prd_id
  WHERE interaction.int_id = ? and group.grp_usr_id = ?;