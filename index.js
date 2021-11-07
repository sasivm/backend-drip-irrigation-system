require('dotenv').config(); // this will set default env file variables to Process env object
const express = require('express');
const app = express();

const ConnectToMongoose = require('./config/connection-config');
const headerMiddleware = require('./middleware/response-headers');

const bulkRegisterRoute = require('./routes/bulk-register');
const cutomerRoute = require('./routes/customer');
const searchCustomersRoute = require('./routes/searchCustomers');
const authRoute = require('./routes/auth');

const { APP_LISTENER_SUCCESS_MESSAGE } = require('./util/constant');

// To make connection to MongoDB
ConnectToMongoose();

app.use(express.json()); // to parse req body everytime

app.use(headerMiddleware); // sets desired headers in reposen headers

app.use('/api/bulkRegister', bulkRegisterRoute);
app.use('/api/customer', cutomerRoute);
app.use('/api/SearchCustomers', searchCustomersRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.APP_PORT;
const DEFAULT_PORT = 5000;
app.listen(PORT || default_port, () => {
    console.log(APP_LISTENER_SUCCESS_MESSAGE, PORT, DEFAULT_PORT);
});
