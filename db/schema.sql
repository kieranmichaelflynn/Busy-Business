DROP SCHEMA IF EXISTS `employee_cms` ;
CREATE SCHEMA `employee_cms` ;


-- Create department table
CREATE TABLE `employee_cms`.`departments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));

-- Create roles table
CREATE TABLE `employee_cms`.`roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `salary` DECIMAL NOT NULL,
  `department_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);



ALTER TABLE `employee_cms`.`roles` 
ADD INDEX `fk_roles_1_idx` (`department_id` ASC) VISIBLE;

ALTER TABLE `employee_cms`.`roles` AUTO_INCREMENT = 20;


ALTER TABLE `employee_cms`.`roles` 
ADD CONSTRAINT `fk_roles_1`
  FOREIGN KEY (`department_id`)
  REFERENCES `employee_cms`.`departments` (`id`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;


CREATE TABLE `employee_cms`.`employees` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `role_id` INT UNSIGNED NULL,
  `manager_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

ALTER TABLE `employee_cms`.`employees` AUTO_INCREMENT = 100;

ALTER TABLE `employee_cms`.`employees` 
ADD INDEX `fk_employees_1_idx` (`role_id` ASC) VISIBLE;

ALTER TABLE `employee_cms`.`employees` 
ADD CONSTRAINT `fk_employees_1`
  FOREIGN KEY (`role_id`)
  REFERENCES `employee_cms`.`roles` (`id`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;


ALTER TABLE `employee_cms`.`employees` 
ADD INDEX `fk_employees_2_idx` (`manager_id` ASC) VISIBLE;


ALTER TABLE `employee_cms`.`employees` 
ADD CONSTRAINT `fk_employees_2`
  FOREIGN KEY (`manager_id`)
  REFERENCES `employee_cms`.`employees` (`id`)
  ON DELETE SET NULL
  ON UPDATE NO ACTION;
