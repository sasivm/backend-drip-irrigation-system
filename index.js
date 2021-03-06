require('dotenv').config(); // this will set default env file variables to Process env object
const express = require('express');
const app = express();
const cors = require('cors')

const ConnectToMongoose = require('./config/connection-config');
const verifyToken = require('./middleware/auth');

const bulkRegisterRoute = require('./routes/bulk-register');
const cutomerRoute = require('./routes/customer');
const searchCustomersRoute = require('./routes/searchCustomers');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const CONSTANTS = require('./util/constant');

const { APP_LISTENER_SUCCESS_MESSAGE } = require('./util/constant');

// To make connection to MongoDB
ConnectToMongoose();

app.use(express.json()); // to parse req body everytime
app.use(cors()); // add necessary headers to req

app.use('/api/bulkRegister', verifyToken, bulkRegisterRoute);
app.use('/api/customer', verifyToken, cutomerRoute);
app.use('/api/SearchCustomers', verifyToken, searchCustomersRoute);
app.use('/api/auth', authRoute);
app.use('/api/admin', verifyToken, adminRoute);

app.use((err, req, res) => {
    console.log('error-middleware executing...');
    console.log('error info ::: ', err);
    return res.status(500).json({ message: CONSTANTS.SERVER_MIDDLEWARE_ERROR });
});

const PORT = process.env.APP_PORT;
const DEFAULT_PORT = 5000;
app.listen(PORT || DEFAULT_PORT, () => {
    console.log(APP_LISTENER_SUCCESS_MESSAGE, PORT, DEFAULT_PORT);
});
