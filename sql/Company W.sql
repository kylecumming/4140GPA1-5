USE `eeddy` ;

CREATE TABLE IF NOT EXISTS `w_parts17` (
  `partNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `partName17` VARCHAR(45) NOT NULL,
  `partDescription17` VARCHAR(45) NOT NULL,
  `currentPrice17` FLOAT NOT NULL,
  `qty17` INT(11) NOT NULL,
  PRIMARY KEY (`partNo17`));

CREATE TABLE IF NOT EXISTS `w_clientUser17` (
  `clientCompId17` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCompName17` VARCHAR(45) NOT NULL,
  `clientCity17` VARCHAR(45) NOT NULL,
  `clientCompPassword17` VARCHAR(45) NOT NULL,
  `moneyOwed17` FLOAT NOT NULL,
  PRIMARY KEY (`clientCompId17`));

CREATE TABLE IF NOT EXISTS `w_POs17` (
  `poNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCompId17` INT(11) NOT NULL,
  `datePO17` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `status17` VARCHAR(45) NOT NULL DEFAULT 'Placed',
  PRIMARY KEY (`poNo17`),
  INDEX `clientCompId17` (`clientCompId17` ASC),
  CONSTRAINT `w__clientCompId17`
    FOREIGN KEY (`clientCompId17`)
    REFERENCES `w_clientUser17` (`clientCompId17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `w_POLines17` (
  `lineNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `poNo17` INT(11) NOT NULL,
  `partNo17` INT(11) NOT NULL,
  `linePrice17` FLOAT NOT NULL,
  `qty17` INT(11) NOT NULL,
  PRIMARY KEY (`lineNo17`),
  INDEX `partNo17` (`partNo17` ASC),
  INDEX `poNo17` (`poNo17` ASC),
  CONSTRAINT `w_partNo17`
    FOREIGN KEY (`partNo17`)
    REFERENCES `w_parts17` (`partNo17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `w_poNo17`
    FOREIGN KEY (`poNo17`)
    REFERENCES `w_POs17` (`poNo17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



INSERT INTO w_clientUser17 VALUES (1, 'Best company', 'Montreal', 'password', 50);
INSERT INTO w_clientUser17 VALUES (2, 'Second best company', 'Toronto', 'pass123', 100);

INSERT INTO w_parts17 VALUES (1, 'Stick', 'Wood', 2.5, 75);
INSERT INTO w_parts17 VALUES (2, 'Plank', 'More wood', 4, 50);
INSERT INTO w_parts17 VALUES (3, 'Board', 'Another type of wood', 5.5, 35);

INSERT INTO w_POs17 VALUES (1, 1, '2021-07-16' , 'Complete');
INSERT INTO w_POs17 VALUES (2, 1, '2021-06-05' , 'Placed');
INSERT INTO w_POs17 VALUES (3, 2, '2021-05-29' , 'Cancelled');

INSERT INTO w_POLines17 VALUES (1, 1, 1, 120, 40);
INSERT INTO w_POLines17 VALUES (2, 1, 2, 16, 4);
INSERT INTO w_POLines17 VALUES (3, 1, 3, 93.5, 17);
INSERT INTO w_POLines17 VALUES (4, 2, 3, 82.5, 15);
INSERT INTO w_POLines17 VALUES (5, 3, 2, 400, 100);