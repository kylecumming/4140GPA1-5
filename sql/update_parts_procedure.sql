DELIMITER //
CREATE PROCEDURE updateparts17(IN selectedpartNo17 int(11), new_currentPrice17 FLOAT, new_qty17 int(11))
BEGIN
    UPDATE parts17
    SET currentPrice17=new_currentPrice17
    WHERE partNo17=selectedpartNo17;

    UPDATE parts17
    SET qty17=new_qty17
    WHERE partNo17=selectedpartNo17;

END
//

DELIMITER ;

    