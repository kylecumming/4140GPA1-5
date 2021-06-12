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
        if(error){
            throw error
        } else if (result.length === 0){
            res.status(404).send(`Error: client is empty`)
        } else {
            res.send(result)
        }
    })
})

app.get('/api/company/getSpecificClient17/:id', (req, res) => {

    let specific_client  = 'SELECT * FROM clientUser17 WHERE id = ?';
    connection.query(specific_client , [req.params.id], (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: Client with ID ${req.params.poNo17} was not found`)
        } else {
            res.send(result[0])
        }
    });

});

app.get('/api/company/getparts17', (req, res) => {
    
    let SQL_list_Parts = 'SELECT * FROM parts17';
    connection.query(SQL_list_Parts, (error, result) => {
        if(error){
            throw error
        }
        else if (result.length === 0){
            res.status(404).send('Error: parts list is empty')
        }
        else{
            res.send(result)
        }
    });
});

app.listen(3000, () => {
    console.log(`Listening on port 3000...`)
});


