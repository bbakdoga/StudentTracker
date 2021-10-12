UPDATE student_tracker.group
SET grp_gtp_id = ?,
  grp_name = ?,
  grp_section = ?,
  grp_start_prd_id = ?,
  grp_start_year = ?,
  grp_end_prd_id = ?,
  grp_end_year = ?
WHERE grp_id = ?
  and grp_usr_id = ?;