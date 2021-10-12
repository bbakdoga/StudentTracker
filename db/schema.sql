-- Schema for Database

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'user'
-- 
-- ---
CREATE DATABASE IF NOT EXISTS student_tracker;
USE student_tracker;

DROP TABLE IF EXISTS `user`;
		
CREATE TABLE `user` (
  `usr_id` INT NOT NULL AUTO_INCREMENT,
  `usr_unity_id` VARCHAR(50) NOT NULL,
  `usr_email` VARCHAR(50) NOT NULL,
  `usr_first_name` VARCHAR(50) NOT NULL,
  `usr_preferred_name` VARCHAR(50) NULL DEFAULT NULL,
  `usr_last_name` VARCHAR(50) NOT NULL,
  `usr_preferred_pronouns` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`usr_id`)
);

-- ---
-- Table 'group'
-- 
-- ---

DROP TABLE IF EXISTS `group`;
		
CREATE TABLE `group` (
  `grp_id` INT NOT NULL AUTO_INCREMENT,
  `grp_gtp_id` INT NULL,
  `grp_usr_id` INT NOT NULL ,
  `grp_name` VARCHAR(50) NULL DEFAULT NULL,
  `grp_section` INT NULL ,
  `grp_start_prd_id` INT NOT NULL,
  `grp_start_year` YEAR NOT NULL,
  `grp_end_prd_id` INT NULL DEFAULT NULL,
  `grp_end_year` YEAR NULL DEFAULT NULL,
  PRIMARY KEY (`grp_id`)
);

-- ---
-- Table 'interaction'
-- 
-- ---

DROP TABLE IF EXISTS `interaction`;
		
CREATE TABLE `interaction` (
  `int_id` INT auto_increment ,
  `int_usr_id` INT,
  `int_grp_id` INT NOT NULL,
  `int_irl_id` INT NULL DEFAULT NULL,
  `int_start_prd_id` INT NOT NULL,
  `int_start_year` YEAR NOT NULL,
  `int_end_prd_id` INT NULL,
  `int_end_year` YEAR NULL,
  PRIMARY KEY (`int_id`),
KEY (`int_id`)
);

-- ---
-- Table 'group_type'
-- 
-- ---

DROP TABLE IF EXISTS `group_type`;
		
CREATE TABLE `group_type` (
  `grp_id` INT NULL AUTO_INCREMENT,
  `grp_name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`grp_id`)
);

-- ---
-- Table 'interaction_role'
-- 
-- ---

DROP TABLE IF EXISTS `interaction_role`;
		
CREATE TABLE `interaction_role` (
  `irl_id` INT NULL AUTO_INCREMENT,
  `irl_name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`irl_id`)
);

-- ---
-- Table 'note'
-- 
-- ---

DROP TABLE IF EXISTS `note`;
		
CREATE TABLE `note` (
  `not_id` INT NULL AUTO_INCREMENT,
  `not_int_id` INT NULL DEFAULT NULL,
  `not_title` VARCHAR(50) NULL DEFAULT NULL,
  `not_text` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`not_id`)
);

-- ---
-- Table 'file'
-- 
-- ---

DROP TABLE IF EXISTS `file`;
		
CREATE TABLE `file` (
  `fil_id` INT NOT NULL AUTO_INCREMENT,
  `fil_int_id` INT NULL DEFAULT NULL,
  `fil_title` VARCHAR(50) NOT NULL DEFAULT 'NULL',
  `fil_description` VARCHAR(50) NULL DEFAULT NULL,
  `fil_name` VARCHAR(50) NULL DEFAULT NULL,
  `fil_real_name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`fil_id`)
);

-- ---
-- Table 'period'
-- 
-- ---

DROP TABLE IF EXISTS `period`;
		
CREATE TABLE `period` (
  `prd_id` INT NULL AUTO_INCREMENT,
  `prd_name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`prd_id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `group` ADD FOREIGN KEY (grp_gtp_id) REFERENCES `group_type` (`grp_id`);
ALTER TABLE `group` ADD FOREIGN KEY (grp_usr_id) REFERENCES `user` (`usr_id`);
ALTER TABLE `group` ADD FOREIGN KEY (grp_start_prd_id) REFERENCES `period` (`prd_id`);
ALTER TABLE `group` ADD FOREIGN KEY (grp_end_prd_id) REFERENCES `period` (`prd_id`);
ALTER TABLE `interaction` ADD FOREIGN KEY (int_usr_id) REFERENCES `user` (`usr_id`);
ALTER TABLE `interaction` ADD FOREIGN KEY (int_grp_id) REFERENCES `group` (`grp_id`);
ALTER TABLE `interaction` ADD FOREIGN KEY (int_irl_id) REFERENCES `interaction_role` (`irl_id`);
ALTER TABLE `interaction` ADD FOREIGN KEY (int_start_prd_id) REFERENCES `period` (`prd_id`);
ALTER TABLE `interaction` ADD FOREIGN KEY (int_end_prd_id) REFERENCES `period` (`prd_id`);
ALTER TABLE `note` ADD FOREIGN KEY (not_int_id) REFERENCES `interaction` (`int_id`);
ALTER TABLE `file` ADD FOREIGN KEY (fil_int_id) REFERENCES `interaction` (`int_id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `user` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `group` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `interaction` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `group_type` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `interaction_role` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `note` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `file` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `period` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `user` (`usr_id`,`usr_email`,`usr_first_name`,`usr_preferred_name`,`usr_last_name`,`usr_preferred_pronouns`) VALUES
-- ('','','','','','');
-- INSERT INTO `group` (`grp_id`,`grp_gtp_id`,`grp_usr_id`,`grp_name`,`grp_section`,`grp_start_prd_id`,`grp_start_year`,`grp_end_prd_id`,`grp_end_year`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `interaction` (`int_id`,`int_usr_id`,`int_grp_id`,`int_irl_id`,`int_start_prd_id`,`int_start_year`,`int_end_prd_id`,`int_end_year`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `group_type` (`grp_id`,`grp_name`) VALUES
-- ('','');
-- INSERT INTO `interaction_role` (`irl_id`,`irl_name`) VALUES
-- ('','');
-- INSERT INTO `note` (`not_id`,`not_int_id`,`not_title`,`not_text`) VALUES
-- ('','','','');
-- INSERT INTO `file` (`fil_id`,`fil_int_id`,`fil_title`,`fil_description`,`fil_name`,`fil_real_name`) VALUES
-- ('','','','','','');
-- INSERT INTO `period` (`prd_id`,`prd_name`) VALUES
-- ('','');