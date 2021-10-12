UPDATE interaction
  JOIN student_tracker.group ON interaction.int_grp_id = student_tracker.group.grp_id
SET int_usr_id = ?,
  int_grp_id = ?,
  int_irl_id = ?,
  int_start_prd_id = ?,
  int_start_year = ?,
  int_end_prd_id = ?,
  int_end_year = ?
WHERE int_id = ? and student_tracker.group.grp_usr_id = ?;