let express = require("express");
const { number } = require("joi");
const Joi = require("joi");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

let mysql = require('mysql');
let app = express();
var cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:2000", "http://localhost:2000/home"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "credentials",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 60*60*24,
        secure: false,
    },
}))



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

app.get('/api/client/getPOList17/:clientCompId17', (req, res) => {

    let SQL_list_POs = 'SELECT * FROM POs17 WHERE clientCompId17 = ?';
    connection.query(SQL_list_POs, [req.params.clientCompId17], (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: PO list is empty`)
        } else {
            res.send(result)
        }
    });
});


app.get('/api/client/getPOs17/:poNo17/:clientCompId17', (req, res) => {
    let SQL_list_one_po = 'SELECT * FROM POs17 WHERE poNo17 = ? AND clientCompId17 = ?';
    connection.query(SQL_list_one_po, [req.params.poNo17, req.params.clientCompId17], (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: PO with ID ${req.params.poNo17} was not found`)
        } else {
            res.send(result[0])
        }
    });

});

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


app.get('/api/client/getPOLines17/:poNo17', (req, res) => {

    let SQL_list_po_lines = 'SELECT * FROM POLines17 WHERE poNo17 = ?';
    connection.query(SQL_list_po_lines, [req.params.poNo17], (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: PO with ID ${req.params.poNo17} was not found`)
        } else {
            res.send(result)
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
    // Varidate request parameter
    const schema = Joi.object({
        clientCompId17: Joi.number().integer().required(),
        partNo17: Joi.number().integer().required(),
        qty17: Joi.number().integer().required(),
        clientCompPassword17: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Check if client with clientCompId17 and clientCompPassword17 exists 
    const sqlSelect = `SELECT * FROM clientUser17 WHERE clientCompId17 = '${req.body.clientCompId17}' AND clientCompPassword17 = '${req.body.clientCompPassword17}';`;

    const data = {
        clientCompId17: req.body.clientCompId17,
        partNo17: req.body.partNo17,
        qty17: req.body.qty17
    };

    connection.query(sqlSelect, function (err, result) {
        // If PO exists
        if (result.length !== 0) {
            const sqlQtytest = `SELECT * FROM parts17 WHERE partNo17 = '${data.partNo17}' AND qty17 >= '${data.qty17}'`;

            connection.query(sqlQtytest, function (err, result) {
                // If there are more qty than POline
                if (result.length !== 0) {
                    connection.query("CALL createSinglePO17(" + data.clientCompId17 + ", " + data.partNo17 + ", " + data.qty17 + ", @poNo);", (err, result) => { });
                    connection.query("SELECT @poNo;", (err, result) => {
                        if (err) throw err;
                        res.send(
                            `The PO with poNo:${Object.values(result[0])} is created`
                        );
                    });

                } else {
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

app.put('/api/client/cancelProgressingPO17', (req, res) => {
    //Validate request parameters
    const schema = Joi.object({
        poNo17: Joi.number().integer().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Check if PO with poNo17 exists 
    const sqlSelect = `SELECT status17 FROM POs17 WHERE poNo17='${req.body.poNo17}';`;

    const data = {
        poNo17: req.body.poNo17
    };

    connection.query(sqlSelect, function (err, results) {
        //if PO exists
        if (results.length !== 0) {
            status17 = results[0].status17;
            const sql = `call updatePO17(${data.poNo17}, "Cancelled");`;
            connection.query(sql, function (err, result, fields) {
                if (err) throw err;
                // If previous status was Placed 
                if (status17 == "Placed") {
                    res.send(
                        `The PO with poNo ${data.poNo17} was Cancelled and a full refund has been provided`
                    );

                } else if (status17 == "Filled") { // order will only be half refunded for cancellation fee
                    res.send(
                        `The PO with poNo ${data.poNo17} was Cancelled, and a cancellation fee has been added to your account`
                    );
                } else { // Cannot cancel if already cancelled or complete
                    res.send(
                        `The PO with poNo ${data.poNo17} cannot be cancelled`
                    );
                }
            });
        } else {
            res
                .status(400)
                .send(
                    `The PO with poNo ${req.body.poNo17} was not found`
                );
        }

    });
});
<<<<<<< HEAD:client_service_api.js
app.get("/api/client/login", (req, res)=> {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})
app.post('/api/client/login', (req, res)=> {
=======

app.post('/api/client/login', (req, res) => {
>>>>>>> 379d3411b7c2ac40cc46faa85d9609d7af356099:api/client_service_api.js
    const username = req.body.username;
    const password = req.body.password;
    const userid = req.body.userid;

    connection.query(
<<<<<<< HEAD:client_service_api.js
        "SELECT * FROM clientUser17 WHERE clientCompName17 = ? AND clientCompPassword17 = ? AND clientCompId17 = ?",
        [username, password, userid],
        (err, result)=> {
=======
        "SELECT * FROM clientUser17 WHERE clientCompName17 = ? AND clientCompPassword17 = ?",
        [username, password],
        (err, result) => {
>>>>>>> 379d3411b7c2ac40cc46faa85d9609d7af356099:api/client_service_api.js

            if (err) {
                res.send({ err: err });
            }
<<<<<<< HEAD:client_service_api.js
            
            if (result.length > 0){
                //setCookie('userid', userid, 30);
                console.log(req.session.user);
=======

            if (result.length > 0) {
>>>>>>> 379d3411b7c2ac40cc46faa85d9609d7af356099:api/client_service_api.js
                res.send(result);
            } else {
                res.send({ message: "Username or password not found" });
            }
        }
    );
});


app.listen(3000, () => {
    console.log(`Listening on port 3000...`)
});