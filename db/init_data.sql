-- Inserting group members
INSERT student_tracker.user VALUES (1, 'kshah', 'kshah7@ncsu.edu', 'Kevin', 'Kevin','Shah','Mr');
INSERT student_tracker.user VALUES (2, 'bbakdoga', 'bbakdoga@ncsu.edu', 'Baris', 'Baris','Akdogan','Mr');
INSERT student_tracker.user VALUES (3, 'atnuccio', 'atnuccio@ncsu.edu', 'Abby', 'Abby','Nuccio','Ms');
INSERT student_tracker.user VALUES (4, 'mtsayeed', 'mtsayeed@ncsu.edu', 'Mustafa', 'Mustafa','Sayeed','Mr');
INSERT student_tracker.user VALUES (5, 'hjrolli2', 'hjrolli2@ncsu.edu', 'Judd', 'Judd','Rollins','Mr');
-- Inserting senior design staff
INSERT student_tracker.user VALUES (6, 'ixdoming', 'ixdoming@ncsu.edu', 'Ignacio', 'Ignacio','Dominguez','Mr');
INSERT student_tracker.user VALUES (7, 'cmpotts', 'cmpotts@ncsu.edu', 'Colin', 'Colin','Potts','Mr');
INSERT student_tracker.user VALUES (8, 'heil', 'heil@ncsu.edu', 'Margaret', 'Margaret','Heil','Ms');
-- Inserting more professors
INSERT student_tracker.user VALUES (9, 'adasgup2', 'adasgup2@ncsu.edu', 'Arno', 'Arno','Dasgupta','Mr');
INSERT student_tracker.user VALUES (10,'twprice', 'twprice@ncsu.edu', 'Thomas', 'Thomas','Price','Mr');
INSERT student_tracker.user VALUES (11,'cflynch', 'cflynch@ncsu.edu', 'Collin', 'Collin','Lynch','Mr');


-- Inserting semesters
INSERT student_tracker.period VALUES ('1','Spring');
INSERT student_tracker.period VALUES ('2','Summer');
INSERT student_tracker.period VALUES ('3','Fall');
INSERT student_tracker.period VALUES ('4','Winter');

-- Inserting roles
INSERT student_tracker.interaction_role VALUES ('1','Professor');
INSERT student_tracker.interaction_role VALUES ('2','Student');
INSERT student_tracker.interaction_role VALUES ('3','Assistant');

-- Inserting interaction types
INSERT student_tracker.group_type VALUES ('1','Class');
INSERT student_tracker.group_type VALUES ('2','Club');
INSERT student_tracker.group_type VALUES ('3','Other');
INSERT student_tracker.group_type VALUES ('4','Research Lab');

-- Inserting classes
INSERT student_tracker.group VALUES('1', '1' , '6' , 'CSC 492 : Senior Design' , '003' , '2' , '2021' , '2' , '2021');
INSERT student_tracker.group VALUES('2', '1' , '6' , 'CSC 433 : Privacy' , '001' , '3' , '2020' , '3' , '2020');
INSERT student_tracker.group VALUES('3', '2' , '6' , 'Robotics Club' , NULL , '1' , '2017' , '3' , '2019');
INSERT student_tracker.group VALUES('4', '2' , '6' , 'HackPack' , NULL , '3' , '2018' , NULL , NULL);

-- Adding our group and staff to CSC 492
INSERT student_tracker.interaction VALUES('1', '1' , '1' , '2' , '1' , '2021' , '1' , '2021');
INSERT student_tracker.interaction VALUES('2', '2' , '1' , '2' , '1' , '2021' , '1' , '2021');
INSERT student_tracker.interaction VALUES('3', '3' , '1' , '2' , '1' , '2021' , '1' , '2021');
INSERT student_tracker.interaction VALUES('4', '4' , '1' , '2' , '1' , '2021' , '1' , '2021');
INSERT student_tracker.interaction VALUES('5', '5' , '1' , '2' , '1' , '2021' , '1' , '2021');
INSERT student_tracker.interaction VALUES('6', '6' , '1' , '1' , '1' , '2021' , '1' , '2021');
INSERT student_tracker.interaction VALUES('7', '7' , '1' , '3' , '1' , '2021' , '1' , '2021');

-- Adding Kevin and Baris to Privacy
INSERT student_tracker.interaction VALUES('8', '1' , '2' , '2' , '3' , '2020' , '3' , '2020');
INSERT student_tracker.interaction VALUES('9', '2' , '2' , '2' , '3' , '2020' , '3' , '2020');

-- Adding Mustafa and Kevin to Robotics Club
INSERT student_tracker.interaction VALUES('10', '4' , '3' , '2' , '1' , '2017' , '1' , '2018');
INSERT student_tracker.interaction VALUES('11', '1' , '3' , '2' , '1' , '2018' , '3' , '2019');

-- Adding Mustafa to Hack Pack
INSERT student_tracker.interaction VALUES('12', '4' , '4' , '2' , '3' , '2018' , NULL , NULL);


-- Adding welcome notes for CSC 492
INSERT student_tracker.note VALUES ('1', '1', "CSC 492 Note 1", "Welcome to CSC 492 Kevin");
INSERT student_tracker.note VALUES ('2', '2', "CSC 492 Note 1", "Welcome to CSC 492 Baris");
INSERT student_tracker.note VALUES ('3', '3', "CSC 492 Note 1", "Welcome to CSC 492 Abby");
INSERT student_tracker.note VALUES ('4', '4', "CSC 492 Note 1", "Welcome to CSC 492 Mustafa");
INSERT student_tracker.note VALUES ('5', '5', "CSC 492 Note 1", "Welcome to CSC 492 Judd");

-- Adding note for Mustafa in Hackpack
INSERT student_tracker.note VALUES ('6', '12', "CSC 422 Note 1", "Welcome to Hackpack Mustafa");

-- Adding note for Kevin and Baris in CSC 433
INSERT student_tracker.note VALUES ('7', '8', "CSC 433 Note 1", "Welcome to CSC 433 Kevin");
INSERT student_tracker.note VALUES ('8', '9', "CSC 433 Note 1", "Welcome to CSC 433 Baris");

-- Adding note for Kevin and Mustafa in Robotics club
INSERT student_tracker.note VALUES ('9', '10', "CSC 411 Note 1", "Welcome to Robotics Club Mustafa");
INSERT student_tracker.note VALUES ('10', '11', "CSC 411 Note 1", "Welcome to Robotics Club Kevin");