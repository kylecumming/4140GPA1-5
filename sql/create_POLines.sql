DELIMITER //

CREATE OR REPLACE PROCEDURE createPOLines371 (IN poNo int(11), selectedpartNo371 int(11), selectedQty371 int(11))
BEGIN
    DECLARE itemPrice float;
    DECLARE totalPrice float;

    SELECT currentPrice17 INTO itemPrice FROM w_parts17 WHERE partNo17 = selectedpartNo371;
    SELECT itemPrice * selectedQty371 INTO totalPrice;

	INSERT INTO `w_POLines17` (`poNo17`, `partNo17`, `linePrice17`, `qty17`) VALUES (poNo, selectedpartNo371, totalPrice, selectedQty371);

END
//

DELIMITER ;

    