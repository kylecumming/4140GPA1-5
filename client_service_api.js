let express = require("express");
const { number } = require("joi");
const Joi = require("joi");
let mysql = require('mysql');
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// let connection = mysql.createConnection({
//     host: 'db.cs.dal.ca',
//     user: 'eeddy',
//     password: 'B00767017',
//     database: 'eeddy'
// });

let connection = mysql.createConnection(
    {
    host: 'db.cs.dal.ca',
    user: 'kariya',
    password: 'K@r1taku27',
    database: 'kariya'
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

app.post('/api/client/postNewOrder17', (req, res) => {
   
    console.log("CCID:" + req.body.clientCompId17);
    console.log("pNo:" + req.body.partNo17);
    console.log("qty:" + req.body.qty17);
    
    // Check if client with clientCompId17 and clientCompPassword17 exists 
    const sqlSelect = `SELECT * FROM clientUser17 WHERE clientCompId17 = '${req.body.clientCompId17}' AND clientCompPassword17 = '${req.body.clientCompPassword17}';`;

    const data = {
        clientCompId17 : req.body.clientCompId17,
        partNo17 : req.body.partNo17,
        qty17 : req.body.qty17
    };

    connection.query(sqlSelect, function (err, result) {
        // If PO exists
        if (result.length !== 0) {
                console.log("login success");
                const sqlQtytest = `SELECT * FROM parts17 WHERE partNo17 = '${data.partNo17}' AND qty17 >= '${data.qty17}'`;

                connection.query(sqlQtytest, function (err, result){
                    // If there are more qty than POline
                    if(result.length !== 0) {
                        connection.query("CALL createSinglePO("+ data.clientCompId17 +", "+ data.partNo17 +", "+ data.qty17 +", @poNo);", (err, result) => {});
                        connection.query("SELECT @poNo;", (err, result) => {
                            if (err) throw err;
                            console.log(Object.values(result[0]));
                            res.send(
                                `The PO with poNo:${Object.values(result[0])} is created`
                            );
                        });
                    
                    }else{
                        res
                            .status(400)
                            .send(
                                "There are not enough parts"
                            );
                    }

                })
                

        } else {
            res
                .status(400)
                .send(
                    `Login failed: userID or password is wrong`
                );
        }
    });

});


app.listen(3000, () => {
    console.log(`Listening on port 3000...`)
});