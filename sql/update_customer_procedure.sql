DELIMITER //
CREATE PROCEDURE updatecustomer(IN selectedclientCompId17 int(11), new_moneyOwed17 FLOAT)
BEGIN   
    DECLARE  currentMoneyOwed17 FLOAT;

    SELECT moneyOwed17 into currentMoneyOwed17 FROM clientUser17 WHERE clientCompId17=selectedclientCompId17;

    UPDATE clientUser17
    SET moneyOwed17=new_moneyOwed17
    WHERE clientCompId17=selectedclientCompId17;

END