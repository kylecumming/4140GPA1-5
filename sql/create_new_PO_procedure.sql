DELIMITER //

CREATE OR REPLACE PROCEDURE createSinglePO (OUT poNo int(11), IN createPOClientCompId17 int(11), selectedpartNo17 int(11), selectedQty17 int(11))
BEGIN
    DECLARE itemPrice INT;
    DECLARE totalPrice INT;

    INSERT INTO POs17 VALUES(NULL ,clientCompId17, NULL, NULL);

    SET poNo = last_insert_id();
    SELECT currentPrice17 INTO itemPrice FROM parts17 WHERE partNo17 = selectedpartNo17;
    SELECT itemPrice * selectedQty17 INTO totalPrice;

    INSERT INTO POLines17 VALUES(NULL, poNo, partNo17, totalPrice, selectedQty17);

    UPDATE clientUser17
    SET moneyOwed17 = moneyOWed17 - totalPrice
    WHERE clientCompId17 = createPOClientCompId17;

    UPDATE parts17
    SET qty17 = qty17 -  selectedQty17
    WHERE partNo17 = selectedpartNo17;

END
//

DELIMITER ;

    