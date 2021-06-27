
DELIMITER //
CREATE PROCEDURE updatePO(IN selectedPONo17 int(11), new_status17 varchar(45))
BEGIN
	DECLARE TotalPOPrice INT;
	DECLARE clientCompId INT;
    DECLARE currStatus varchar(45);
    
    SELECT status17 into currStatus FROM POs17 WHERE poNo17=selectedPONo17;
    
	UPDATE POs17
	SET status17=new_status17
    WHERE poNo17=selectedPONo17;
    
    IF  currStatus!= "Cancelled" AND new_status17 = "Cancelled" THEN
		SELECT clientCompId17 into clientCompId FROM POs17 WHERE poNo17=selectedPONo17;
        SELECT SUM(linePrice17) into TotalPOPrice FROM POLines17 WHERE poNo17=selectedPONo17;
        
		UPDATE clientUser17
		SET moneyOwed17=moneyOwed17 - TotalPOPrice
        WHERE clientCompId17=clientCompId;
        
	END IF;
END
//