DELIMITER //
CREATE PROCEDURE createPO (IN clientCompId17 int(11))
BEGIN
    DECLARE currentPrice FLOAT;
    DECLARE currentqty17 INT;

    SELECT currentPrice17 into currentPrice FROM parts17 WHERE partNo17=selectedpartNo17;

    UPDATE parts17
    SET currentPrice17=new_currentPrice17
    WHERE partNo17=selectedpartNo17;

    SELECT qty17 into currentqty17 FROM parts17 WHERE partNo17=selectedpartNo17;

    UPDATE parts17
    SET qty17=new_qty17
    WHERE partNo17=selectedpartNo17;

END

    