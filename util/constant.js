const CUST_REC_REQ_FIELDS = ['applicationId', 'block', 'department', 'district', 'farmerName', 'farmerType', 'fatherName', 'gender', 'miCompany', 'mobileNo', 'socialStatus', 'village',
    'irrigationType', 'workOrderDate', 'miLandRec', 'surveyCropRec'];
const CUST_FILE_DATA_INVALID = 'The Customers data excel file sent was not correct format'; // Not in array Format
const CUST_FILE_DATA_EMPTY = 'The file sent was dont have any Customers details';
const CUST_FILE_SAVED_SUCCESS = 'All the records are stored successfully in Database';
const CUST_EXIST_MESSAGE = 'Customer with same Application Id is already exist';
const CUST_MORETHAN_ONE_CUSTID = 'More than one customer with Same application id found';
const CUST_ID_INVALID_MESSAGE = 'Customer Id is Invalid';
const CUST_PHONE_NO_INVALID_MESSAGE = 'Phone Number is not valid';
const CUST_SEARCH_SUCCESS_MESSAGE = 'Customer record(s) found';

const APP_LISTENER_SUCCESS_MESSAGE = 'Web Server is listening at port no';
const APP_UNKNOWN_ERROR_MESSAGE = 'Something went wrong - unknown error';
const INVALID_APPLICATION_ID = 'Application Id is invalid';
const APPLICATION_ID_NOT_PASSED = 'Application Id is not passed';

const MI_UPDATE_SUCCESS = 'MI Land details updated successfully';
const DATA_NOT_PASSED = 'The required data is not passed';
const CUST_UPDATE_SUCCESS = 'Customer details updated successfully';
const CUST_DELETE_SUCCESS = 'Customer record deleted successfully';
const SEARCH_DATA_NOT_PASSED = 'Req doesnt have any valid query';

const LOGIN_EMAIL_PASS_REQ = 'Email and Password are required';
const LOGIN_FAILED_MESSAGE = 'Email or Password is Invalid';
const LOGIN_SUCCESS_MESSAGE = 'Admin logged in successfully';

const REG_EMAIL_EXIST = 'Email already exist';
const REG_SUCCESS_MESSAGE = 'Sub-Admin added successfully.';

const ADMIN_ID_INVALID_MESSAGE = 'Admin Id is invalid';
const ADMIN_UPDATE_SUCCESS = 'Admin record updated successfully';
const ADMIN_DELETE_SUCCESS = 'Admin record deleted successfully';

const UNAUTHORIZED_ACCESS = 'Unauthorize request';
const INVALID_TOKEN = 'Unauthorize request - Token is invalid';

const UNCAUGHT_ERROR_MESSAGE = 'Some uncaught error occured';
const SERVER_MIDDLEWARE_ERROR = 'Some error occured in server side. Please check the server logs for more info.';

module.exports = {
    CUST_REC_REQ_FIELDS,
    CUST_FILE_DATA_INVALID, CUST_FILE_DATA_EMPTY, CUST_FILE_SAVED_SUCCESS,
    CUST_EXIST_MESSAGE, CUST_MORETHAN_ONE_CUSTID, CUST_ID_INVALID_MESSAGE,
    CUST_PHONE_NO_INVALID_MESSAGE, CUST_SEARCH_SUCCESS_MESSAGE,
    APP_LISTENER_SUCCESS_MESSAGE, APP_UNKNOWN_ERROR_MESSAGE,
    INVALID_APPLICATION_ID, APPLICATION_ID_NOT_PASSED, CUST_DELETE_SUCCESS,
    MI_UPDATE_SUCCESS, DATA_NOT_PASSED, CUST_UPDATE_SUCCESS, SEARCH_DATA_NOT_PASSED,
    LOGIN_EMAIL_PASS_REQ, LOGIN_FAILED_MESSAGE, LOGIN_SUCCESS_MESSAGE,
    ADMIN_ID_INVALID_MESSAGE, ADMIN_UPDATE_SUCCESS, ADMIN_DELETE_SUCCESS,
    REG_EMAIL_EXIST, REG_SUCCESS_MESSAGE, UNAUTHORIZED_ACCESS, INVALID_TOKEN,
    UNCAUGHT_ERROR_MESSAGE, SERVER_MIDDLEWARE_ERROR
};