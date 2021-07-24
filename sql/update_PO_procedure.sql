
DELIMITER //
CREATE PROCEDURE updatePO17(IN selectedPONo17 int(11), new_status17 varchar(45))
BEGIN
	DECLARE TotalPOPrice INT;
	DECLARE clientCompId INT;
    DECLARE currStatus varchar(45);
    
    SELECT status17 into currStatus FROM POs17 WHERE poNo17=selectedPONo17;
    
	IF new_status17 != "Complete" THEN
		UPDATE POs17
		SET status17=new_status17
		WHERE poNo17=selectedPONo17;
	END IF;
    
    IF new_status17 = "Cancelled" THEN
	
		SELECT clientCompId17 into clientCompId FROM POs17 WHERE poNo17=selectedPONo17;
		SELECT SUM(linePrice17) into TotalPOPrice FROM POLines17 WHERE poNo17=selectedPONo17;
		IF  currStatus = "Placed" THEN
			UPDATE clientUser17
			SET moneyOwed17=moneyOwed17 - TotalPOPrice
			WHERE clientCompId17=clientCompId;
		END IF;
		IF currStatus = "Filled" THEN
			UPDATE clientUser17
			SET moneyOwed17=moneyOwed17 - (TotalPOPrice * 0.5) # Cancellation Fee
			WHERE clientCompId17=clientCompId;
		END IF;
        
        # Do nothing if already cancelled or complete 
        
	END IF;
END
//