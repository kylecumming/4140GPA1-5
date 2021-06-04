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

app.get('/api/getPart17/:partNo17', (req, res) => {

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

app.listen(3000, () => {
    console.log(`Listening on port 3000...`)
});


