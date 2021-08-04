DELIMITER //

CREATE OR REPLACE PROCEDURE createNoLinePO371 (IN createPOClientCompId17 int(11), OUT poNo int(11))
BEGIN

   INSERT INTO `w_POs17` (`clientCompId17`, `datePO17`) VALUES ( createPOClientCompId17, CURRENT_DATE());

    SELECT last_insert_id() INTO poNo;

END
//

DELIMITER ;