UPDATE note
join interaction on interaction.int_id = note.not_int_id
join student_tracker.group on interaction.int_grp_id = student_tracker.group.grp_id
SET not_title = ?, not_text = ?
WHERE not_int_id = ? and student_tracker.group.grp_usr_id = ? and not_id = ?;