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

const { APP_LISTENER_SUCCESS_MESSAGE } = require('./util/constant');

// To make connection to MongoDB
ConnectToMongoose();

app.use(express.json()); // to parse req body everytime

app.use(cors());

app.use('/api/bulkRegister', verifyToken, bulkRegisterRoute);
app.use('/api/customer', verifyToken, cutomerRoute);
app.use('/api/SearchCustomers', verifyToken, searchCustomersRoute);
app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
    console.log('error-middleware executing...');
    console.log('error info', err);
    return res.status(500).json({ message: 'MongooseError' });
});

const PORT = process.env.APP_PORT;
const DEFAULT_PORT = 5000;
app.listen(PORT || default_port, () => {
    console.log(APP_LISTENER_SUCCESS_MESSAGE, PORT, DEFAULT_PORT);
});
