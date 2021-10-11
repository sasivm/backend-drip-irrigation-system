const express = require('express');
const app = express();

const customers = require('./routes/bulk-register');
const cutomerRoute = require('./routes/customer');
const searchCustomersRoute = require('./routes/searchCustomers');

const mangoose = require('mongoose');

/* For testing perpose only */
// DOMAIN_NAME = 'mongodb://0.0.0.0:27017/';
DOMAIN_NAME = 'secret';
DB_NAME = 'test';
PORT = 5000;
MONGODB_URI = DOMAIN_NAME + DB_NAME;

mangoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Mango DB Connected...');
        console.log('URI is : ', MONGODB_URI);
    })
    .catch(err => console.log('Could not connect to mongoDB... error-info : ', err));

app.use(express.json()); // to parse req body everytime

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api/bulkRegister', customers);
app.use('/api/customer', cutomerRoute);
app.use('/api/SearchCustomers', searchCustomersRoute);

app.listen(process.env.PORT || PORT, () => {
    console.log('app listener');
});

console.log('Web Server is listening at port ', process.env.PORT, PORT);
