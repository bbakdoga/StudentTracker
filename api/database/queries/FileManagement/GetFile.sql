SELECT fil_id, fil_int_id, fil_title, fil_name, fil_real_name FROM file
join interaction on interaction.int_id = file.fil_int_id
join student_tracker.group on interaction.int_grp_id = student_tracker.group.grp_id
where file.fil_int_id= ? and student_tracker.group.grp_usr_id = ? and file.fil_id = ?;