USE `eeddy` ;

CREATE TABLE IF NOT EXISTS `y_parts17` (
  `partNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `partName17` VARCHAR(45) NOT NULL,
  `partDescription17` VARCHAR(45) NOT NULL,
  `currentPrice17` FLOAT NOT NULL,
  `qty17` INT(11) NOT NULL,
  PRIMARY KEY (`partNo17`));

CREATE TABLE IF NOT EXISTS `y_clientUser17` (
  `clientCompId17` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCompName17` VARCHAR(45) NOT NULL,
  `clientCity17` VARCHAR(45) NOT NULL,
  `clientCompPassword17` VARCHAR(45) NOT NULL,
  `moneyOwed17` FLOAT NOT NULL,
  PRIMARY KEY (`clientCompId17`));

CREATE TABLE IF NOT EXISTS `y_POs17` (
  `poNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCompId17` INT(11) NOT NULL,
  `datePO17` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `status17` VARCHAR(45) NOT NULL DEFAULT 'Placed',
  PRIMARY KEY (`poNo17`),
  INDEX `clientCompId17` (`clientCompId17` ASC),
  CONSTRAINT `y__clientCompId17`
    FOREIGN KEY (`clientCompId17`)
    REFERENCES `y_clientUser17` (`clientCompId17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `y_POLines17` (
  `lineNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `poNo17` INT(11) NOT NULL,
  `partNo17` INT(11) NOT NULL,
  `linePrice17` FLOAT NOT NULL,
  `qty17` INT(11) NOT NULL,
  PRIMARY KEY (`lineNo17`),
  INDEX `partNo17` (`partNo17` ASC),
  INDEX `poNo17` (`poNo17` ASC),
  CONSTRAINT `y_partNo17`
    FOREIGN KEY (`partNo17`)
    REFERENCES `y_parts17` (`partNo17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `y_poNo17`
    FOREIGN KEY (`poNo17`)
    REFERENCES `y_POs17` (`poNo17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



INSERT INTO y_clientUser17 VALUES (1, 'A Company', 'Bedford', '1', 100);
INSERT INTO y_clientUser17 VALUES (2, 'B Company', 'Dartmouth', '2', 205);
INSERT INTO y_clientUser17 VALUES (3, 'C Company', 'Halifax', '3', 350);

INSERT INTO y_parts17 VALUES (1, 'Cord', 'A Cord', 10, 100);
INSERT INTO y_parts17 VALUES (2, 'Nail', 'A Nail', 1, 1000);
INSERT INTO y_parts17 VALUES (3, 'Bolt', 'A Bolt', 2, 345);
INSERT INTO y_parts17 VALUES (4, 'Pipe', 'A Pipe', 10.5, 17);

INSERT INTO y_POs17 VALUES (1, 1, '2021-06-06' , 'Filled');
INSERT INTO y_POs17 VALUES (2, 3, '2021-07-20' , 'Placed');
INSERT INTO y_POs17 VALUES (3, 2, '2021-02-19' , 'Complete');

INSERT INTO y_POLines17 VALUES (1, 1, 4, 52.5, 3);
INSERT INTO y_POLines17 VALUES (2, 3, 3, 2, 1);
INSERT INTO y_POLines17 VALUES (3, 3, 4, 84, 8);
INSERT INTO y_POLines17 VALUES (4, 2, 2, 100, 100);