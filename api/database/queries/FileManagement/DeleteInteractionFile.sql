delete file from file
join interaction on interaction.int_id = file.fil_int_id
join student_tracker.group on interaction.int_grp_id = student_tracker.group.grp_id
where file.fil_int_id= ? and student_tracker.group.grp_usr_id = ?  and file.fil_id = ?;