SELECT not_id, not_int_id, not_title, not_text FROM note
join interaction on interaction.int_id = note.not_int_id
join student_tracker.group on interaction.int_grp_id = student_tracker.group.grp_id
where note.not_int_id= ? and student_tracker.group.grp_usr_id = ?;