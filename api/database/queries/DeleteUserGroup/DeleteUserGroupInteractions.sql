delete interaction from interaction
join student_tracker.group on interaction.int_grp_id = student_tracker.group.grp_id
where student_tracker.group.grp_id= ? and student_tracker.group.grp_usr_id = ?;