DELIMITER //

CREATE OR REPLACE PROCEDURE createSinglePO17 (IN createPOClientCompId17 int(11), selectedpartNo17 int(11), selectedQty17 int(11), company VARCHAR, OUT poNo int(11))
BEGIN
    DECLARE itemPrice float;
    DECLARE totalPrice float;

   INSERT INTO company + `_POs17` (`clientCompId17`, `datePO17`) VALUES ( createPOClientCompId17, CURRENT_DATE());

    SELECT last_insert_id() INTO poNo;
    SELECT currentPrice17 INTO itemPrice FROM w_parts17 WHERE partNo17 = selectedpartNo17;
    SELECT itemPrice * selectedQty17 INTO totalPrice;

	INSERT INTO company + `_POLines17` (`poNo17`, `partNo17`, `linePrice17`, `qty17`) VALUES (poNo, selectedpartNo17, totalPrice, selectedQty17);

END
//

DELIMITER ;

    