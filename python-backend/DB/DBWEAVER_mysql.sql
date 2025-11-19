CREATE DATABASE IF NOT EXISTS users_DB;

USE users_DB;

CREATE TABLE IF NOT EXISTS `User` (
  `user_id` INT AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `username` VARCHAR(50),
  `avatar_url` VARCHAR(100),
  PRIMARY KEY (`user_id`),
  UNIQUE (`email`)
);

CREATE TABLE IF NOT EXISTS `Labels` (
  `label_id` INT AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `tag_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`label_id`),
  FOREIGN KEY (`user_id`)
      REFERENCES `User`(`user_id`)
);

CREATE TABLE IF NOT EXISTS `ContactList` (
  `contact_id` INT AUTO_INCREMENT,
  `owner_user_id` INT NOT NULL,
  `contact_user_id` INT NOT NULL,
  `added_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contact_id`),
  FOREIGN KEY (`owner_user_id`)
      REFERENCES `User`(`user_id`),
  FOREIGN KEY (`contact_user_id`)
      REFERENCES `User`(`user_id`)
);

CREATE TABLE IF NOT EXISTS `LabelApplied` (
  `contact_id` INT NOT NULL,
  `label_id` INT NOT NULL,
  FOREIGN KEY (`label_id`)
      REFERENCES `Labels`(`label_id`),
  FOREIGN KEY (`contact_id`)
      REFERENCES `ContactList`(`contact_id`)
);


CREATE TABLE IF NOT EXISTS `Note` (
  `note_id` INT AUTO_INCREMENT,
  `contact_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`note_id`),
  FOREIGN KEY (`contact_id`)
      REFERENCES `ContactList`(`contact_id`)
);

CREATE TABLE IF NOT EXISTS `Admin` (
  `admin_id` INT AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  KEY `UNQ` (`email`)
);

CREATE TABLE IF NOT EXISTS `Page` (
  `page_id` INT AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(50),
  `config_json` TEXT,
  `page_url` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`page_id`),
  UNIQUE (`page_url`),
  FOREIGN KEY (`user_id`)
      REFERENCES `User`(`user_id`)
);

CREATE TABLE IF NOT EXISTS `Component` (
  `component_id` INT AUTO_INCREMENT,
  `page_id` INT NOT NULL,
  `type` VARCHAR(20),
  `data_json` TEXT,
  `display_order` INT,
  PRIMARY KEY (`component_id`),
  FOREIGN KEY (`page_id`)
      REFERENCES `Page`(`page_id`)
);


