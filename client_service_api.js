let express = require("express");
let mysql = require('mysql');
let app = express();

let connection = mysql.createConnection({
    host: 'db.cs.dal.ca',
    user: 'eeddy',
    password: 'B00767017',
    database: 'eeddy'
});

connection.connect(function (err) {
    if (err) {
        return console.error('error: ', err.message);
    }

    console.log('Connected to the MySQL server.');
});

app.get('/api/client/getPartsList17', (req, res) => {

    let SQL_list_parts = 'SELECT * FROM parts17';
    connection.query(SQL_list_parts, (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: there are no parts in the list`)
        } else {
            res.send(result)
        }
    });

})

app.get('/api/client/getPOs17/:poNo17', (req, res) => {

    let SQL_list_one_po = 'SELECT * FROM POs17 WHERE poNo17 = ?';
    connection.query(SQL_list_one_po, [req.params.poNo17], (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: PO with ID ${req.params.poNo17} was not found`)
        } else {
            res.send(result[0])
        }
    });

});

app.get('/api/client/getPOList17', (req, res) => {

    let SQL_list_POs = 'SELECT * FROM POs17';
    connection.query(SQL_list_POs, (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: PO list is empty`)
        } else {
            res.send(result)
        }
    });
});

app.put('/api/company/cancelProgressingPO17', (req, res) => {
	//Validate request parameters
	const schema = Joi.object({
		poNo17: Joi.number().interger().required(),
		status17: Joi.string().valid("Pending", "Cancelled", "Complete", "In Progress")
	});
    	const { error } = schema.validate(req.body);
    	if (error) {
    	    res.status(400).send(error.details[0].message);
     	    return;
    	}
	
	// Check if PO with poNo17 exists 
    	const sqlSelect = `SELECT * FROM POs17 WHERE poNo17='${req.body.poNo17}';`;

    	const data = {
        	poNo17: req.body.poNo17,
        	status17: req.body.status17
    	};

	connection.query(sqlSelect, function (err, results) {
		//if PO exists
		if(result.length !== 0) {
			if (data.status17 != undefined) {
				connection.query(sql, function (err, result, fields) {
				if (err) throw err;
				if (data.status17 == "Pending"){
					res.send(
						`The PO with poNo ${data.poNo17} was Cancelled and a refund has been provided`
						);
				} else {
					res.send(
						`The PO with poNo ${data.poNo17} was Cancelled, and a cancellation fee has been added to your account`
						);
				const sql = `call updatePO(${data.poNo17}, "${data.status17}");`;
				}
			});
		} else {
		res
                .status(400)
                .send(
                    `The PO with poNo ${req.body.poNo17} was not found`
                );
        }
    }

});
});





app.listen(3000, () => {
    console.log(`Listening on port 3000...`)
});