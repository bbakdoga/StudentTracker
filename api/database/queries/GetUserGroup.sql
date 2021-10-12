SELECT grp.grp_id,
  grp.grp_usr_id,
  grp.grp_name,
  grp.grp_section,
  grp.grp_gtp_id,
  group_type.grp_name as grp_gtp_name,
  grp.grp_start_prd_id,
  start_period.prd_name as start_period,
  grp.grp_start_year as start_year,
  grp.grp_end_prd_id,
  end_period.prd_name as end_period,
  grp.grp_end_year as end_year
FROM student_tracker.group as grp
  JOIN period as start_period ON grp.grp_start_prd_id = start_period.prd_id
  JOIN group_type ON grp.grp_gtp_id = group_type.grp_id
  LEFT JOIN period as end_period ON grp.grp_end_prd_id = end_period.prd_id
WHERE grp.grp_id = ? and grp.grp_usr_id = ?