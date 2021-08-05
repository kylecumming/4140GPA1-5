DELIMITER //
CREATE OR REPLACE PROCEDURE checkFulfill17 (IN poNo371 int(11), IN company17 VARCHAR(45), OUT status17 varchar(45))
BEGIN  
 
	DECLARE done INT DEFAULT false;
    DECLARE temp_partNo int;
    DECLARE lineNo371 int;
    DECLARE check371 boolean DEFAULT true;
    DECLARE clientNo371 int;
    DECLARE order371 int;
    DECLARE available371 int;
    DECLARE cur_w CURSOR FOR 
        SELECT lineNo17
        FROM w_POLines17 
        WHERE w_POLines17.poNo17 = poNo371;
    DECLARE cur_x CURSOR FOR 
        SELECT lineNo17
        FROM x_POLines17 
        WHERE x_POLines17.poNo17 = poNo371;
    DECLARE cur_y CURSOR FOR 
        SELECT lineNo17
        FROM y_POLines17 
        WHERE y_POLines17.poNo17 = poNo371;
    DECLARE cur_z CURSOR FOR 
        SELECT lineNo17
        FROM z_POLines17 
        WHERE z_POLines17.poNo17 = poNo371;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = true;

    
    

    IF company17 LIKE 'w' THEN 

        SET clientNo371 = (SELECT clientCompId17 FROM w_POs17 WHERE poNo17 = poNo371);
        
        OPEN cur_w;
        
        read_loop: LOOP
            FETCH cur_w INTO lineNo371;
                IF done THEN
                    LEAVE read_loop;
                ELSEIF NOT check371 THEN
                    LEAVE read_loop;
                END IF;
                SET temp_partNo = (SELECT partNo17 FROM w_POLines17 WHERE w_POLines17.lineNo17 = lineNo371); 
                SET order371 = (SELECT qty17 FROM w_POLines17 WHERE lineNo17 = lineNo371);
                SET available371 = (SELECT qty17 FROM w_parts17 WHERE partNo17 = temp_partNo); 
                IF (order371 > available371 AND check371 = true) THEN
                    SET check371 = false;
                ELSEIF (check371 = true) THEN 
                    UPDATE w_parts17 SET qty17 = qty17 - order371 WHERE partNo17 = temp_partNo;
                    UPDATE w_clientUser17 SET moneyOwed17 = moneyOwed17 + (SELECT linePrice17 FROM w_POLines17 WHERE lineNo17 = lineNo371) WHERE clientCompId17 = clientNo371;
                END IF;
            END LOOP read_loop;
            
            IF (check371 = true) THEN
                UPDATE w_POs17 SET status17 = 'Filled' WHERE poNo17 = poNo371;
            END IF;
        
        CLOSE cur_w;
        
        SELECT w_POs17.status17 FROM w_POs17 WHERE poNo17 = poNo371 INTO status17;
    
    ELSE 
        IF company17 LIKE 'y' THEN

            SET clientNo371 = (SELECT clientCompId17 FROM y_POs17 WHERE poNo17 = poNo371);
            
            OPEN cur_y;
            
            read_loop: LOOP
                FETCH cur_y INTO lineNo371;
                    IF done THEN
                        LEAVE read_loop;
                    ELSEIF NOT check371 THEN
                        LEAVE read_loop;
                    END IF;
                    SET temp_partNo = (SELECT partNo17 FROM y_POLines17 WHERE y_POLines17.lineNo17 = lineNo371); 
                    SET order371 = (SELECT qty17 FROM y_POLines17 WHERE lineNo17 = lineNo371);
                    SET available371 = (SELECT qty17 FROM y_parts17 WHERE partNo17 = temp_partNo); 
                    IF (order371 > available371 AND check371 = true) THEN
                        SET check371 = false;
                    ELSEIF (check371 = true) THEN 
                        UPDATE y_parts17 SET qty17 = qty17 - order371 WHERE partNo17 = temp_partNo;
                        UPDATE y_clientUser17 SET moneyOwed17 = moneyOwed17 + (SELECT linePrice17 FROM y_POLines17 WHERE lineNo17 = lineNo371) WHERE clientCompId17 = clientNo371;
                    END IF;
                END LOOP read_loop;
                
                IF (check371 = true) THEN
                    UPDATE y_POs17 SET status17 = 'Filled' WHERE poNo17 = poNo371;
                END IF;
            
            CLOSE cur_y;
            
            SELECT y_POs17.status17 FROM y_POs17 WHERE poNo17 = poNo371 INTO status17;

        ELSE 
            IF company17 LIKE 'x' THEN
                SET clientNo371 = (SELECT clientCompId17 FROM x_POs17 WHERE poNo17 = poNo371);
                
                OPEN cur_x;
                
                read_loop: LOOP
                    FETCH cur_x INTO lineNo371;
                        IF done THEN
                            LEAVE read_loop;
                        ELSEIF NOT check371 THEN
                            LEAVE read_loop;
                        END IF;
                        SET temp_partNo = (SELECT partNo17 FROM x_POLines17 WHERE x_POLines17.lineNo17 = lineNo371); 
                        SET order371 = (SELECT qty17 FROM x_POLines17 WHERE lineNo17 = lineNo371);
                        SET available371 = (SELECT qty17 FROM x_parts17 WHERE partNo17 = temp_partNo); 
                        IF (order371 > available371 AND check371 = true) THEN
                            SET check371 = false;
                        ELSEIF (check371 = true) THEN 
                            UPDATE x_parts17 SET qty17 = qty17 - order371 WHERE partNo17 = temp_partNo;
                            UPDATE x_clientUser17 SET moneyOwed17 = moneyOwed17 + (SELECT linePrice17 FROM x_POLines17 WHERE lineNo17 = lineNo371) WHERE clientCompId17 = clientNo371;
                        END IF;
                    END LOOP read_loop;
                    
                    IF (check371 = true) THEN
                        UPDATE x_POs17 SET status17 = 'Filled' WHERE poNo17 = poNo371;
                    END IF;
                
                CLOSE cur_x;
                
                SELECT x_POs17.status17 FROM x_POs17 WHERE poNo17 = poNo371 INTO status17;

            ELSE
                SET clientNo371 = (SELECT clientCompId17 FROM z_POs17 WHERE poNo17 = poNo371);
                
                OPEN cur_z;
                
                read_loop: LOOP
                    FETCH cur_z INTO lineNo371;
                        IF done THEN
                            LEAVE read_loop;
                        ELSEIF NOT check371 THEN
                            LEAVE read_loop;
                        END IF;
                        SET temp_partNo = (SELECT partNo17 FROM z_POLines17 WHERE z_POLines17.lineNo17 = lineNo371); 
                        SET order371 = (SELECT qty17 FROM z_POLines17 WHERE lineNo17 = lineNo371);
                        SET available371 = (SELECT qty17 FROM z_parts17 WHERE partNo17 = temp_partNo); 
                        IF (order371 > available371 AND check371 = true) THEN
                            SET check371 = false;
                        ELSEIF (check371 = true) THEN 
                            UPDATE z_parts17 SET qty17 = qty17 - order371 WHERE partNo17 = temp_partNo;
                            UPDATE z_clientUser17 SET moneyOwed17 = moneyOwed17 + (SELECT linePrice17 FROM z_POLines17 WHERE lineNo17 = lineNo371) WHERE clientCompId17 = clientNo371;
                        END IF;
                    END LOOP read_loop;
                    
                    IF (check371 = true) THEN
                        UPDATE z_POs17 SET status17 = 'Filled' WHERE poNo17 = poNo371;
                    END IF;
                
                CLOSE cur_z;
                
                SELECT z_POs17.status17 FROM z_POs17 WHERE poNo17 = poNo371 INTO status17;

            END IF;
        END IF;
    END IF;

END//
DELIMITER ;