let express = require("express");
let mysql = require('mysql');
let app = express();

let connection = mysql.createConnection({
    host: 'db.cs.dal.ca',
    user: 'eeddy',
    password: 'B00767017',
    database: 'eeddy'
});

connection.connect(function(err) {
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

app.post('/api/client/postNewOrder17:companyID', (req, res) => {

    // Validate request parameters
    const schema = Joi.object({
        poNo17: Joi.number().integer().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let SQL_new_PO = ''
})


app.listen(3000, () => {
    console.log(`Listening on port 3000...`)
});