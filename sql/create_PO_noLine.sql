DELIMITER //

CREATE OR REPLACE PROCEDURE createNoLinePO17 (IN createPOClientCompId17 int(11), IN company VARCHAR(45), OUT poNo int(11))
BEGIN

	IF company LIKE "w" THEN
		INSERT INTO `w_POs17` (`clientCompId17`, `datePO17`) VALUES ( createPOClientCompId17, CURRENT_DATE());
	ELSE 
		IF company LIKE "x" THEN
			INSERT INTO `x_POs17` (`clientCompId17`, `datePO17`) VALUES ( createPOClientCompId17, CURRENT_DATE());
		ELSE 
			IF company LIKE "y" THEN
				INSERT INTO `y_POs17` (`clientCompId17`, `datePO17`) VALUES ( createPOClientCompId17, CURRENT_DATE());
			ELSE 
				INSERT INTO `z_POs17` (`clientCompId17`, `datePO17`) VALUES ( createPOClientCompId17, CURRENT_DATE());
			END IF;
		END IF;
	END IF;
    SELECT last_insert_id() INTO poNo;

END
//

DELIMITER ;