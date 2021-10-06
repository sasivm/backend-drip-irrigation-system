const express = require('express');
const app = express();

const { validateCustomer } = require('./models/multi-customer');
const customers = require('./routes/bulk-register');
const cutomerRoute = require('./routes/customer');

const mangoose = require('mongoose');

mangoose.connect('mongodb://localhost/drip')
    .then(() => console.log('Mango DB Connected...'))
    .catch(err => console.log('Could not connect to mangooDB...'));

const port = 3000;

app.use(express.json()); // to parse req body everytime

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

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

app.use('/bulkRegister', customers);
app.use('/customer', cutomerRoute);

const applicantRecStruct = {
    applicationId: '',
    block: '',
    department: '',
    district: '',
    farmerName: '',
    farmerType: '',
    gender: 1,
    miCompany: '',
    mobileNo: 0,
    socialStatus: '',
    village: ''
};

const applicantDetails = {
    applicationId: "A-TPR-gdm-4121435605-2021-22",
    block: "Gudimangalam",
    department: "Agriculture",
    district: "Tiruppur",
    farmerName: "SAKTHIVEL AND PECHIAMMAL",
    farmerType: "SF / MF",
    gender: 1,
    miCompany: "Vedanta Irrigation system Pvt Ltd.",
    mobileNo: 6379768677,
    socialStatus: "Other Caste",
    village: "Thottampatti",
    department: '',
    irrigationType: '',
    surveyNo: [],
    totalArea: '',
    appliedArea: '',
};

const applicantMILandDetails = {
    //mi land
    department: '',
    irrigationType: '',
    //survey
    surveyNo: '',
    totalArea: '',
    appliedArea: '',
    //crop
    crop: '',
    spacing: ''
};

app.post('/register', (req, res) => {
    const applicantData = req.body;
    const validationRes = validateCustomer(applicantData);
    if (!validationRes) {
        res.send('Success...')
    } else {
        res.status(400).send(validationRes);
        return validationRes;
    }
});

app.listen(process.env.port || port, () => {
    console.log('app listener');
});

console.log('Web Server is listening at port ' + (process.env.port || port));