USE `eeddy` ;

CREATE TABLE IF NOT EXISTS `z_parts17` (
  `partNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `partName17` VARCHAR(45) NOT NULL,
  `partDescription17` VARCHAR(45) NOT NULL,
  `currentPrice17` FLOAT NOT NULL,
  `qty17` INT(11) NOT NULL,
  PRIMARY KEY (`partNo17`));

CREATE TABLE IF NOT EXISTS `z_clientUser17` (
  `clientCompId17` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCompName17` VARCHAR(45) NOT NULL,
  `clientCity17` VARCHAR(45) NOT NULL,
  `clientCompPassword17` VARCHAR(45) NOT NULL,
  `moneyOwed17` FLOAT NOT NULL,
  PRIMARY KEY (`clientCompId17`));

CREATE TABLE IF NOT EXISTS `z_POs17` (
  `poNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCompId17` INT(11) NOT NULL,
  `datePO17` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `status17` VARCHAR(45) NOT NULL DEFAULT 'Placed',
  PRIMARY KEY (`poNo17`),
  INDEX `clientCompId17` (`clientCompId17` ASC),
  CONSTRAINT `z__clientCompId17`
    FOREIGN KEY (`clientCompId17`)
    REFERENCES `z_clientUser17` (`clientCompId17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `z_POLines17` (
  `lineNo17` INT(11) NOT NULL AUTO_INCREMENT,
  `poNo17` INT(11) NOT NULL,
  `partNo17` INT(11) NOT NULL,
  `linePrice17` FLOAT NOT NULL,
  `qty17` INT(11) NOT NULL,
  PRIMARY KEY (`lineNo17`),
  INDEX `partNo17` (`partNo17` ASC),
  INDEX `poNo17` (`poNo17` ASC),
  CONSTRAINT `z_partNo17`
    FOREIGN KEY (`partNo17`)
    REFERENCES `z_parts17` (`partNo17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `z_poNo17`
    FOREIGN KEY (`poNo17`)
    REFERENCES `z_POs17` (`poNo17`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



INSERT INTO z_clientUser17 VALUES (1, 'Big company', 'Miami', '123321', 1022);
INSERT INTO z_clientUser17 VALUES (2, 'Little company', 'Toronto', '123456789', 144);
-----
INSERT INTO z_parts17 VALUES (1, 'Metal', 'Some metal', 5, 10);
INSERT INTO z_parts17 VALUES (2, 'Wood', 'Some wood', 4.75, 16);
INSERT INTO z_parts17 VALUES (3, 'Stone', 'Some stone', 4.5, 43);
INSERT INTO z_parts17 VALUES (4, 'Soil', 'Some soil', 2, 75);
INSERT INTO z_parts17 VALUES (5, 'String', 'Some string', 3.5, 23);

INSERT INTO z_POs17 VALUES (1, 2, '2021-06-14' , 'Cancelled');
INSERT INTO z_POs17 VALUES (2, 1, '2021-03-17' , 'Placed');
INSERT INTO z_POs17 VALUES (3, 1, '2021-07-29' , 'Placed');

INSERT INTO z_POLines17 VALUES (1, 1, 1, 70, 14);
INSERT INTO z_POLines17 VALUES (2, 1, 2, 14.25, 3);
INSERT INTO z_POLines17 VALUES (3, 2, 3, 27, 6);
INSERT INTO z_POLines17 VALUES (4, 2, 4, 26, 13);
INSERT INTO z_POLines17 VALUES (5, 3, 5, 70, 20);
