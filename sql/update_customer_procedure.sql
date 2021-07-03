DELIMITER //
CREATE PROCEDURE updatecustomer17(IN selectedclientCompId17 int(11), new_moneyOwed17 FLOAT)
BEGIN   
    UPDATE clientUser17
    SET moneyOwed17=new_moneyOwed17
    WHERE clientCompId17=selectedclientCompId17;

END
//

DELIMITER ;