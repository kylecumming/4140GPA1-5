let express = require("express");
let mysql = require('mysql');
let Joi = require("joi");
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/api/company/getPart17/:partNo17', (req, res) => {

    let SQL_list_one_part = 'SELECT * FROM parts17 WHERE partNo17 = ?';
    connection.query(SQL_list_one_part, [req.params.partNo17], (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: Part with ID ${req.params.partNo17} was not found`)
        } else {
            res.send(result[0])
        }
    });

})

app.get('/api/company/getPOs17/:poNo17', (req, res) => {

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

app.get('/api/company/getPOList17', (req, res) => {

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

app.get('/api/company/getClientList17', (req, res) => {

    let client_info = "SELECT * FROM clientUser17";
    connection.query(client_info, (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: client is empty`)
        } else {
            res.send(result)
        }
    })
})

app.get('/api/company/getSpecificClient17/:id17', (req, res) => {

    let specific_client = 'SELECT * FROM clientUser17 WHERE clientCompID17 = ?';
    connection.query(specific_client, [req.params.id17], (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: Client with ID ${req.params.id17} was not found`)
        } else {
            res.send(result[0])
        }
    });

});

app.get('/api/company/getPartsList17', (req, res) => {

    let SQL_list_Parts = 'SELECT * FROM parts17';
    connection.query(SQL_list_Parts, (error, result) => {
        if (error) {
            throw error
        }
        else if (result.length === 0) {
            res.status(404).send('Error: parts list is empty')
        }
        else {
            res.send(result)
        }
    });
});

app.put('/api/company/updatePO17', (req, res) => {
    // Validate request parameters
    const schema = Joi.object({
        poNo17: Joi.number().integer().required(),
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

    connection.query(sqlSelect, function (err, result) {
        // If PO exists
        if (result.length !== 0) {
            if (data.status17 != undefined) {
                const sql = `call updatePO(${data.poNo17}, "${data.status17}");`;
                connection.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    if (data.status17 == "Cancelled") {
                        res.send(
                            `The PO with poNo ${data.poNo17} was Cancelled and a refund has been provided`
                        );
                    } else {
                        res.send(
                            `The PO with poNo ${data.poNo17} is now ${data.status17}`
                        );
                    }
                });
            }
        } else {
            res
                .status(400)
                .send(
                    `The PO with poNo ${req.body.poNo17} was not found`
                );
        }
    });

});

app.put('/api/company/updateparts17', (req, res) => {

    const schema = Joi.object({
        partNo17: Joi.number().integer().required(),
        currentPrice17: Joi.number().required(),
        qty17: Joi.number().integer().required()
    });

    const { error } = schema.validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const sqlSelect = `SELECT * FROM parts17 WHERE partNo17='${req.body.partNo17}';`;

    const data = {
        partNo17: req.body.partNo17,
        currentPrice17: req.body.currentPrice17,
        qty17: req.body.qty17
    };

    connection.query(sqlSelect, function (err, result){
        if(result.length !== 0){
            if(data.currentPrice17 != undefined && data.qty17 != undefined){
                const sql = `call updateparts17(${data.partNo17}, ${data.currentPrice17}, ${data.qty17});`;
                res.send(
                    `The part with partNo17 ${data.partNo17} has been updated`
                )
            }
        }

    });
});

app.put('/api/company/updateclientuser17', (req, res) => {

    const schema = Joi.object({
        clientCompId17: Joi.number().integer().required(),
        moneyOwed17: Joi.number().required()
    });

    const { error } = schema.validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const sqlSelect = `SELECT * FROM clientuser17 WHERE clientCompId17='${req.body.clientCompId17}';`;

    const data = {
        clientCompId17: req.body.clientCompId17,
        moneyOwed17: req.body.moneyOwed17
    };

    connection.query(sqlSelect, function (err, result){
        if(result.length !== 0){
            if(data.clientCompId17 != undefined && data.moneyOwed17 != undefined){
                const sql = `call updateclientuser17(${data.clientCompId17}, ${data.moneyOwed17});`;
                res.send(
                    `The client with clientCompId17 ${data.clientCompId17} has been updated`
                )
            }
        }

    });
});

app.listen(3000, () => {
    console.log(`Listening on port 3000...`)
});


