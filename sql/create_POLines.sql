DELIMITER //

CREATE OR REPLACE PROCEDURE createPOLines17 (IN poNo int(11), selectedpartNo371 int(11), selectedQty371 int(11), IN company VARCHAR(45))
BEGIN
    DECLARE itemPrice float;
    DECLARE totalPrice float;

    SELECT currentPrice17 INTO itemPrice FROM w_parts17 WHERE partNo17 = selectedpartNo371;
    SELECT itemPrice * selectedQty371 INTO totalPrice;

	IF company LIKE "w" THEN
		INSERT INTO `w_POLines17` (`poNo17`, `partNo17`, `linePrice17`, `qty17`) VALUES (poNo, selectedpartNo371, totalPrice, selectedQty371);
	ELSE 
		IF company LIKE "x" THEN
			INSERT INTO `x_POLines17` (`poNo17`, `partNo17`, `linePrice17`, `qty17`) VALUES (poNo, selectedpartNo371, totalPrice, selectedQty371);
		ELSE 
			IF company LIKE "y" THEN
				INSERT INTO `y_POLines17` (`poNo17`, `partNo17`, `linePrice17`, `qty17`) VALUES (poNo, selectedpartNo371, totalPrice, selectedQty371);
			ELSE 
				INSERT INTO `z_POLines17` (`poNo17`, `partNo17`, `linePrice17`, `qty17`) VALUES (poNo, selectedpartNo371, totalPrice, selectedQty371);
			END IF;
		END IF;
	END IF;
    
    
END
//

DELIMITER ;
