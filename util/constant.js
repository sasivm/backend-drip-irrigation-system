const CUST_REC_REQ_FIELDS = ['applicationId', 'block', 'department', 'district', 'farmerName', 'farmerType', 'gender', 'miCompany', 'mobileNo', 'socialStatus', 'village',
    'miLandRec', 'surveyCropRec'];
const CUST_INVALID_DATA_FORMAT = 'The Customers data sent was not correct format'; // Not in array Format
const CUST_NO_CUST_DATA = 'Customers details is not present';

const INVALID_REC_AT_PREFIX = 'Customers details is not correct from';
const CUST_ALL_REC_SAVED = 'All the records are stored successfully in DB';

const CUST_ALREADY_EXIST_ERROR_OBJ = {
    message: 'Customer details already exist'
};

const MORETHAN_ONE_CUST_ID_FOUND = {
    message: 'Application id with more than one customer found'
};

module.exports = {
    CUST_REC_REQ_FIELDS,
    INVALID_DATA_FORMAT: CUST_INVALID_DATA_FORMAT,
    NO_CUST_DATA: CUST_NO_CUST_DATA,
    INVALID_REC_AT: INVALID_REC_AT_PREFIX,
    ALL_REC_SAVED: CUST_ALL_REC_SAVED,
    CUST_ALREADY_EXIST: CUST_ALREADY_EXIST_ERROR_OBJ,
    MANY_CUST_ONE_ID: MORETHAN_ONE_CUST_ID_FOUND
};