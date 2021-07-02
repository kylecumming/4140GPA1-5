-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema eeddy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eeddy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eeddy` DEFAULT CHARACTER SET latin1 ;
USE `eeddy` ;

-- -----------------------------------------------------
-- Table `eeddy`.`parts17`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eeddy`.`parts17` (
  `partNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `partName17` VARCHAR(45) NOT NULL,
  `partDescription17` VARCHAR(45) NOT NULL,
  `currentPrice17` FLOAT NOT NULL,
  `qty17` INT(11) NOT NULL,
  PRIMARY KEY (`partNo17`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `eeddy`.`clientUser17`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eeddy`.`clientUser17` (
  `clientCompId17` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCompName17` VARCHAR(45) NOT NULL,
  `clientCity17` VARCHAR(45) NOT NULL,
  `clientCompPassword17` VARCHAR(45) NOT NULL,
  `moneyOwed17` FLOAT NOT NULL,
  PRIMARY KEY (`clientCompId17`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `eeddy`.`POs17`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eeddy`.`POs17` (
  `poNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCompId17` INT(11) NOT NULL,
  `datePO17` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `status17` VARCHAR(45) NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`poNo17`),
  INDEX `clientCompId17` (`clientCompId17` ASC),
  CONSTRAINT `clientCompId17`
    FOREIGN KEY (`clientCompId17`)
    REFERENCES `eeddy`.`clientUser17` (`clientCompId17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `eeddy`.`POLines17`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eeddy`.`POLines17` (
  `lineNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `poNo17` INT(11) NOT NULL,
  `partNo17` INT(11) NOT NULL,
  `linePrice17` FLOAT NOT NULL,
  `qty17` INT(11) NOT NULL,
  PRIMARY KEY (`lineNo17`),
  INDEX `partNo17` (`partNo17` ASC),
  INDEX `poNo17` (`poNo17` ASC),
  CONSTRAINT `partNo17`
    FOREIGN KEY (`partNo17`)
    REFERENCES `eeddy`.`parts17` (`partNo17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `poNo17`
    FOREIGN KEY (`poNo17`)
    REFERENCES `eeddy`.`POs17` (`poNo17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
