USE `eeddy` ;

CREATE TABLE IF NOT EXISTS `x_parts17` (
  `partNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `partName17` VARCHAR(45) NOT NULL,
  `partDescription17` VARCHAR(45) NOT NULL,
  `currentPrice17` FLOAT NOT NULL,
  `qty17` INT(11) NOT NULL,
  PRIMARY KEY (`partNo17`));

CREATE TABLE IF NOT EXISTS `x_clientUser17` (
  `clientCompId17` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCompName17` VARCHAR(45) NOT NULL,
  `clientCity17` VARCHAR(45) NOT NULL,
  `clientCompPassword17` VARCHAR(45) NOT NULL,
  `moneyOwed17` FLOAT NOT NULL,
  PRIMARY KEY (`clientCompId17`));

CREATE TABLE IF NOT EXISTS `x_POs17` (
  `poNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCompId17` INT(11) NOT NULL,
  `datePO17` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `status17` VARCHAR(45) NOT NULL DEFAULT 'Placed',
  PRIMARY KEY (`poNo17`),
  INDEX `clientCompId17` (`clientCompId17` ASC),
  CONSTRAINT `fk_clientCompId17`
    FOREIGN KEY (`clientCompId17`)
    REFERENCES `x_clientUser17` (`clientCompId17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `x_POLines17` (
  `lineNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `poNo17` INT(11) NOT NULL,
  `partNo17` INT(11) NOT NULL,
  `linePrice17` FLOAT NOT NULL,
  `qty17` INT(11) NOT NULL,
  PRIMARY KEY (`lineNo17`),
  INDEX `partNo17` (`partNo17` ASC),
  INDEX `poNo17` (`poNo17` ASC),
  CONSTRAINT `fk_partNo17`
    FOREIGN KEY (`partNo17`)
    REFERENCES `x_parts17` (`partNo17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_poNo17`
    FOREIGN KEY (`poNo17`)
    REFERENCES `x_POs17` (`poNo17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



INSERT INTO x_clientUser17 VALUES (1, 'A Company', 'London', 'abc', 50);
INSERT INTO x_clientUser17 VALUES (2, 'Another Company', 'Paris', '789', 1.50);
INSERT INTO x_clientUser17 VALUES (3, 'One more Company', 'New York', 'apple', 1000);

INSERT INTO x_parts17 VALUES (1, 'Screw', 'A Screw', 1.5, 2);
INSERT INTO x_parts17 VALUES (2, 'Wood', 'A plank of wood', 11, 5);

INSERT INTO x_POs17 VALUES (1, 2, '2021-04-03' , 'Cancelled');
INSERT INTO x_POs17 VALUES (2, 1, '2021-05-20' , 'Placed');
INSERT INTO x_POs17 VALUES (3, 1, '2021-07-20' , 'Placed');

INSERT INTO x_POLines17 VALUES (1, 1, 1, 3, 2);
INSERT INTO x_POLines17 VALUES (2, 1, 2, 22, 2);
INSERT INTO x_POLines17 VALUES (3, 2, 2, 11, 1);
INSERT INTO x_POLines17 VALUES (4, 3, 2, 55, 5);
