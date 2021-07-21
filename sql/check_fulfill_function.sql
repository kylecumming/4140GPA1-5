DELIMITER //
CREATE OR REPLACE FUNCTION checkFulfill (poNo371 int(11)) RETURNS varchar(45)
BEGIN  
 
	  DECLARE done INT DEFAULT false;
    DECLARE temp_partNo int;
    DECLARE lineNo371 int;
    DECLARE check371 boolean DEFAULT true;
    DECLARE clientNo371 int;
    DECLARE order371 int;
    DECLARE available371 int;
    
    DECLARE cur CURSOR FOR 
    SELECT lineNo17
    FROM POLines17 
    WHERE POLines17.poNo17 = poNo371;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = true;

    SET clientNo371 = (SELECT clientCompId17 FROM POs17 WHERE poNo17 = poNo371);
    
    OPEN cur;
    
    read_loop: LOOP
   		FETCH cur INTO lineNo371;
        	IF done THEN
      			LEAVE read_loop;
            ELSEIF NOT check371 THEN
            	LEAVE read_loop;
            END IF;
        	SET temp_partNo = (SELECT partNo17 FROM POLines17 WHERE POLines17.lineNo17 = lineNo371); 
            SET order371 = (SELECT qty17 FROM POLines17 WHERE lineNo17 = lineNo371);
            SET available371 = (SELECT qty17 FROM parts17 WHERE partNo17 = temp_partNo); 
        	IF (order371 > available371 AND check371 = true) THEN
        		SET check371 = false;
         	ELSEIF (check371 = true) THEN 
            	UPDATE parts17 SET qty17 = qty17 - order371 WHERE partNo17 = temp_partNo;
            	UPDATE clientUser17 SET moneyOwed17 = moneyOwed17 + (SELECT linePrice17 FROM POLines17 WHERE lineNo17 = lineNo371) WHERE clientCompId17 = clientNo371;
            END IF;
   	 	END LOOP read_loop;
        
        IF (check371 = true) THEN
        	UPDATE POs17 SET status17 = 'Filled' WHERE poNo17 = poNo371;
        END IF;
    
    CLOSE cur;
    
    RETURN (SELECT POs17.status17 FROM POs17 WHERE poNo17 = poNo371);

END//
DELIMITER ;