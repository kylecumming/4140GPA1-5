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
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "credentials",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
        secure: false,
    },
}))

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

url_start = `/api/client/${company}`

parts_table = `${company}_parts17`
clients_table = `${company}_clientUser17`
POs_table = `${company}_POs17`
POLines_table = `${company}_POLines17`


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

// get List of parts
app.get(`${url_start}/getPartsList17`, (req, res) => {

    let SQL_list_parts = `SELECT * FROM ${parts_table}`;
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

// get specific part
app.get(`${url_start}/getPart/:partNo17`, (req, res) => {

    let SQL_list_parts = `SELECT * FROM ${parts_table} WHERE partNo17 = ?`;
    connection.query(SQL_list_parts, [req.params.partNo17], (error, result) => {
        if (error) {
            throw error
        } else if (result.length === 0) {
            res.status(404).send(`Error: Part with ID ${req.params.partNo17} was not found`)
        } else {
            res.send(result[0])
        }
    });
});


//get List of PO with ClientID
app.get(`${url_start}/getPOList17/:clientCompId17`, (req, res) => {

    let SQL_list_POs = `SELECT * FROM ${POs_table} WHERE clientCompId17 = ?`;
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

//get POs with poNo and ClientID
app.get(`${url_start}/getPOs17/:poNo17/:clientCompId17`, (req, res) => {
    let SQL_list_one_po = `SELECT * FROM ${POs_table} WHERE poNo17 = ? AND clientCompId17 = ?`;
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

//get POs with poNo
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

//get POline
app.get(`${url_start}/getPOLines17/:poNo17`, (req, res) => {

    let SQL_list_po_lines = `SELECT * FROM ${POLines_table} WHERE poNo17 = ?`;
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


// get all the PO list
app.get(`${url_start}/getPOList17`, (req, res) => {

    let SQL_list_POs = `SELECT * FROM ${POs_table}`;
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

// posting new order
app.post(`${url_start}/postNewOrder17`, (req, res) => {
    // Varidate request parameter
    const schema = Joi.object({
        clientCompId17: Joi.number().integer().required(),
        clientCompPassword17: Joi.string().required(),
        poLines371: Joi.array().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Check if client with clientCompId17 and clientCompPassword17 exists 
    const sqlSelect = `SELECT * FROM ${clients_table} WHERE clientCompId17 = '${req.body.clientCompId17}' AND clientCompPassword17 = '${req.body.clientCompPassword17}';`;

    const data = {
        clientCompId17: req.body.clientCompId17,
        poLines371: req.body.poLines371
    };

    connection.query(sqlSelect, function (err, result) {
        // If PO exists
        if (result.length !== 0) {
            // const sqlQtytest = `SELECT * FROM ${parts_table} WHERE partNo17 = '${data.partNo17}' AND qty17 >= '${data.qty17}'`;
            const sqlQtytest = `SELECT * FROM ${parts_table} WHERE partNo17 = 1 AND qty17 >= 0`;

            connection.query(sqlQtytest, function (err, result) {
                // If there are more qty than POline
                if (result.length !== 0) {
                    connection.query("CALL createNoLinePO17(" + data.clientCompId17 + ", '" + company + "', @poNo);", (err, result) => { });

                    console.log(data.poLines371);
                    data.poLines371.forEach(function (element) {
                        if (element.id != 0) {
                            connection.query("CALL createPOLines17(@poNo, " + element.partNo + ", " + element.qty + ", '" + company + "')", (err, result) => {
                                console.log(result);
                            });
                        }
                    });
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

// cancel PO
app.put(`${url_start}/cancelProgressingPO17`, (req, res) => {
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
    const sqlSelect = `SELECT status17 FROM ${POs_table} WHERE poNo17='${req.body.poNo17}';`;

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

// Login (get)
app.get(`${url_start}/login`, (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

// Login (post)
app.post(`${url_start}/login`, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userid = req.body.userid;

    connection.query(
        `SELECT * FROM ${clients_table} WHERE clientCompName17 = ? AND clientCompPassword17 = ? AND clientCompId17 = ?`, [username, password, userid],
        (err, result) => {

            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                //setCookie('userid', userid, 30);
                console.log(req.session.user);
                res.send(result);
            } else {
                res.send({ message: "Username or password not found" });
            }
        }
    );
});


// Deafult port different for each company
switch (company) {
    case 'w':
        port = 3000
        break;
    case 'x':
        port = 3001
        break;
    case 'y':
        port = 3002
        break;
    case 'z':
        port = 3003
        break;
}

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});