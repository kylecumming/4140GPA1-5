DELIMITER //

CREATE OR REPLACE PROCEDURE createSinglePO (IN createPOClientCompId17 int(11), selectedpartNo17 int(11), selectedQty17 int(11), OUT poNo int(11))
BEGIN
    DECLARE itemPrice float;
    DECLARE totalPrice float;

   INSERT INTO `POs17` (`clientCompId17`, `datePO17`) VALUES ( createPOClientCompId17, CURRENT_DATE());

    SELECT last_insert_id() INTO poNo;
    SELECT currentPrice17 INTO itemPrice FROM parts17 WHERE partNo17 = selectedpartNo17;
    SELECT itemPrice * selectedQty17 INTO totalPrice;

	INSERT INTO `POLines17` (`poNo17`, `partNo17`, `linePrice17`, `qty17`) VALUES (poNo, selectedpartNo17, totalPrice, selectedQty17);

    UPDATE clientUser17
    SET moneyOwed17 = moneyOWed17 - totalPrice
    WHERE clientCompId17 = createPOClientCompId17;

    UPDATE parts17
    SET qty17 = qty17 -  selectedQty17
    WHERE partNo17 = selectedpartNo17;

END
//

DELIMITER ;

    