let express = require("express");
let mysql = require('mysql');
let Joi = require("joi");
let app = express();
var cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let connection = mysql.createConnection({
    host: 'db.cs.dal.ca',
    user: 'eeddy',
    password: 'B00767017',
    database: 'eeddy'
});

let transaction = mysql.createConnection({
    host: 'db.cs.dal.ca',
    user: 'eeddy',
    password: 'B00767017',
    database: 'eeddy'
});


const yargs = require('yargs');

const argv = yargs
    .option('company', {
        alias: 'c',
        description: 'Tell which company to connect to',
        type: 'string',
        demand: true,
        choices: ['w', 'x', 'y', 'z']
    })
    .help()
    .alias('help', 'h')
    .argv;

company = argv.company

url_start = `/api/company/${company}`

parts_table = `${company}_parts17`
clients_table = `${company}_clientUser17`
POs_table = `${company}_POs17`
POLines_table = `${company}_POLines17`

connection.connect(function (err) {
    if (err) {
        return console.error('error: ', err.message);
    }

    console.log('Connected to the MySQL server.');
});

app.get(`${url_start}/getPart17/:partNo17`, (req, res) => {

    let SQL_list_one_part = `SELECT * FROM ${parts_table} WHERE partNo17 = ?`;
    connection.query(SQL_list_one_part, [req.params.partNo17], (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: Part with ID ${req.params.partNo17} was not found`)
        } else {
            res.send(result[0])
        }
    });

});

app.get(`${url_start}/getPOs17/:poNo17`, (req, res) => {

    let SQL_list_one_po = `SELECT * FROM ${POs_table} WHERE poNo17 = ?`;
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

app.get(`${url_start}/getPOList17`, (req, res) => {

    let SQL_list_POs = `SELECT ${POs_table}.*, ${clients_table}.clientCity17, ${clients_table}.moneyOwed17 FROM ${POs_table} NATURAL JOIN ${clients_table};`;
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

app.get(`${url_start}/getClientList17`, (req, res) => {

    let client_info = `SELECT * FROM ${clients_table}`;
    connection.query(client_info, (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: client is empty`)
        } else {
            res.send(result)
        }
    });
});

app.get(`${url_start}/getSpecificClient17/:id17`, (req, res) => {

    let specific_client = `SELECT * FROM ${clients_table} WHERE clientCompID17 = ?`;
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

app.get(`${url_start}/getPODetail371/:poNo371`, (req, res) => {

    let specific_po = `SELECT ${POs_table}.*, ${clients_table}.clientCity17, ${clients_table}.moneyOwed17 FROM ${POs_table} NATURAL JOIN ${clients_table} WHERE ${POs_table}.poNo17 = ?;`;
    connection.query(specific_po, [req.params.poNo371], (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: Detail for poNo ${req.params.poNo371} was not found`)
        } else {
            res.send(result[0]);
        }
    });
});

app.get(`${url_start}/getPOLines371/:poNo371`, (req, res) => {

    let specific_poLine = `SELECT POLines371.linePrice17, POLines371.lineNO17, POLines371.partNo17, POLines371.qty17 AS order_qty371, ${parts_table}.qty17 AS avail_qty371, ${parts_table}.currentPrice17 FROM (SELECT * FROM ${POLines_table} WHERE poNo17 = ?) POLines371 LEFT JOIN ${parts_table} ON POLines371.partNo17 = ${parts_table}.partNo17`;
    connection.query(specific_poLine, [req.params.poNo371], (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: POLine for poNo ${req.params.poNo371} was not found`)
        } else {
            res.send(result);
        }
    });
});

app.get(`${url_start}/startTransaction371/:poNo371`, (req, res) => {

    transaction.beginTransaction(function (err) {
        console.log('transaction started')
        if (err) {
            console.error(err);
            return;
        }

        let getstatus371 = `SELECT status17 FROM ${POs_table} WHERE poNo17 = ?`
        connection.query(getstatus371, [req.params.poNo371], (err, result) => {

            if (result[0].status17 == 'Placed') {
                // res.send('checking');
<<<<<<< HEAD
                transaction.query("CALL checkFulfill17(" + req.params.poNo371 + ", '" + company + "', @status17);", (err, result) => {
                    console.log('checkFulfill called')
                    transaction.query(getstatus371, [req.params.poNo371], (err, result) => {
                        console.log(Object.values(result[0])[0]);
                        if (Object.values(result[0])[0] != 'Filled') {
                            res.send('unfillable');
                            transaction.rollback(function(err) {
                                console.log("Rollbacked with error");
                            });

                        } else if (result.length === 0) {
                            res.status(404).send(`Error: POLine for poNo ${req.params.poNo371} was not found`)
                        } else {
                            res.send('checking');
                            console.log('waiting for end request');
                            app.get(`${url_start}/endTransaction371/:status371`, (req1, res1) => {
                                if (req1.params.status371 == 'commit') {
                                    transaction.commit(function(err) {
                                        if (err) {
                                            transaction.rollback(function() {
                                                throw err;
                                            });
                                        }
                                        console.log('Commit: success !');
                                        res1.send('Commit: success !');
                                    });
                                } else {
                                    transaction.rollback(function() {
                                        console.log('Roll back: success !');
                                        res1.send('Roll back: success !');
                                    });
                                }
                            });
                        }
                    });
=======
                let check_fulfill371 = 'SELECT checkFulfill (?)';
                transaction.query(check_fulfill371, [req.params.poNo371], (err, result) => {
                    if (Object.values(result[0])[0] != 'Filled') {
                        res.send('unfillable');
                        transaction.rollback(function (err) {

                        });

                    } else if (result.length === 0) {
                        res.status(404).send(`Error: POLine for poNo ${req.params.poNo371} was not found`)
                    } else {
                        res.send('checking');
                        console.log('waiting for end request');
                        app.get('/api/company/endTransaction371/:status371', (req1, res1) => {
                            if (req1.params.status371 == 'commit') {
                                transaction.commit(function (err) {
                                    if (err) {
                                        transaction.rollback(function () {
                                            throw err;
                                        });
                                    }
                                    console.log('Commit: success !');
                                    res1.send('Commit: success !');
                                });
                            } else {
                                transaction.rollback(function () {
                                    console.log('Roll back: success !');
                                    res1.send('Roll back: success !');
                                });
                            }
                        });
                    }
>>>>>>> d604647cf6476f92b466fab42ed196eeb68b0711
                });

            } else {
                res.send('unfillable');
            }

        });


    });


});


app.get(`${url_start}/getPartsList17`, (req, res) => {

    let SQL_list_Parts = `SELECT * FROM ${parts_table}`;
    connection.query(SQL_list_Parts, (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send('Error: parts list is empty')
        } else {
            res.send(result)
        }
    });
});

app.put(`${url_start}/updatePO17`, (req, res) => {
    // Validate request parameters
    const schema = Joi.object({
        poNo17: Joi.number().integer().required(),
        status17: Joi.string().valid("Placed", "Cancelled", "Complete", "Filled")
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Check if PO with poNo17 exists 
    const sqlSelect = `SELECT * FROM ${POs_table} WHERE poNo17='${req.body.poNo17}';`;

    const data = {
        poNo17: req.body.poNo17,
        status17: req.body.status17
    };

    connection.query(sqlSelect, function (err, result) {
        // If PO exists
        if (result.length !== 0) {
            if (data.status17 != undefined) {
                const sql = `call updatePO17(${data.poNo17}, "${data.status17}");`;
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

app.put(`${url_start}/updateparts17`, (req, res) => {

    const schema = Joi.object({
        partNo17: Joi.number().integer().required(),
        currentPrice17: Joi.number().required(),
        qty17: Joi.number().integer().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const sqlSelect = `SELECT * FROM ${parts_table} WHERE partNo17='${req.body.partNo17}';`;

    const data = {
        partNo17: req.body.partNo17,
        currentPrice17: req.body.currentPrice17,
        qty17: req.body.qty17
    };

    connection.query(sqlSelect, function (err, result) {
        if (result.length !== 0) {
            if (data.currentPrice17 != undefined && data.qty17 != undefined) {
                const sql = `UPDATE ${parts_table} SET currentPrice17= ${data.currentPrice17},  qty17=${data.qty17} WHERE partNo17=${data.partNo17};`
                connection.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    res.send(
                        `The part with partNo17 ${data.partNo17} has been updated`
                    )
                });
            }
        } else {
            res
                .status(400)
                .send(
                    `The part with partNo17 ${data.partNo17} was not found`
                );
        }

    });
});

app.put(`${url_start}/updateclientuser17`, (req, res) => {

    const schema = Joi.object({
        clientCompId17: Joi.number().integer().required(),
        moneyOwed17: Joi.number().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const sqlSelect = `SELECT * FROM ${clients_table} WHERE clientCompId17='${req.body.clientCompId17}';`;

    const data = {
        clientCompId17: req.body.clientCompId17,
        moneyOwed17: req.body.moneyOwed17
    };

    connection.query(sqlSelect, function (err, result) {
        if (result.length !== 0) {
            if (data.clientCompId17 != undefined && data.moneyOwed17 != undefined) {
                const sql = `call updatecustomer17(${data.clientCompId17}, ${data.moneyOwed17});`;
                connection.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    res.send(
                        `The client with clientCompId17 ${data.clientCompId17} has been updated`
                    )
                });
            }
        } else {
            res
                .status(400)
                .send(
                    `The client with clientCompId17 ${data.clientCompId17} was not found`
                );
        }

    });
});

app.get(`/api/company/z/getAllClientList17`, (req, res) => {

    let client_info = `SELECT *, 'Client W' as TableName
    from w_clientUser17
    union all
    select *, 'Client X' as TableName
    from x_clientUser17
    union all
    select *, 'Client Y' as TableName
    from y_clientUser17
    order by TableName;`;
    connection.query(client_info, (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: client is empty`)
        } else {
            res.send(result)
        }
    });
});

app.get(`/api/company/z/getAllPartsList17`, (req, res) => {

    let SQL_list_Parts = `SELECT *, 'Client W' as TableName
    from w_parts17
    union all
    select *, 'Client X' as TableName
    from x_parts17
    union all
    select *, 'Client Y' as TableName
    from y_parts17
    order by TableName;`;
    connection.query(SQL_list_Parts, (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send('Error: parts list is empty')
        } else {
            res.send(result)
        }
    });
});



// Deafult port different for each company
switch (company) {
    case 'w':
        port = 4000
        break;
    case 'x':
        port = 4001
        break;
    case 'y':
        port = 4002
        break;
    case 'z':
        port = 4003
        break;
}

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});

// commented out