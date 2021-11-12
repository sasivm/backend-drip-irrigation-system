const express = require('express');
const router = express.Router();

const routeErrorHandler = require('../middleware/error-handler');
const { createCustomer, validateCustomer } = require('../models/multi-customer');
const CONSTANTS = require('../util/constant');

const checkPayloadIsValid = (payload) => {
    if (!Array.isArray(payload)) {
        return CONSTANTS.CUST_FILE_DATA_INVALID;
    } else if (payload.length < 1) {
        return CONSTANTS.CUST_FILE_DATA_EMPTY;
    }

    return null;
};

router.post('/', routeErrorHandler(async (req, res) => {
    const resposeJson = {
        message: '',
        isSuccess: true,
        invalidRecordAt: -1
    };
    const custDetailsArr = req.body;

    const isValidReq = checkPayloadIsValid(custDetailsArr);

    if (isValidReq) {
        resposeJson.message = isValidReq;
        resposeJson.isSuccess = false;
        return res.json(resposeJson);
    }

    const validCustArr = [];

    let errorReason = null; let i = 0;
    for (; i < custDetailsArr.length; i++) {
        const customerRecord = {};
        for (const field of CONSTANTS.CUST_REC_REQ_FIELDS) {
            customerRecord[field] = custDetailsArr[i][field];
        }
        const validationRes = validateCustomer(customerRecord);

        if (validationRes) {
            errorReason = validationRes;
            console.log(i, ' Failed record');
            console.log(customerRecord);
            break;
        } else {
            validCustArr.push(customerRecord);
        }
    }

    if (errorReason) {
        resposeJson.message = errorReason;
        resposeJson.isSuccess = false;
        resposeJson.invalidRecordAt = (i + 1) || 1;
        return res.json(resposeJson);
    }

    /* Save each valid customer to db */
    for (let k = 0; k < validCustArr.length; k++) {
        const validCustRec = validCustArr[k];
        try {
            validCustRec.createdBy = req.adminName; // sets in middlware after verifying token
            console.log('cust rec ', validCustRec);
            const saveRecRes = await createCustomer(validCustRec);
            console.log(k, 'Record Saved: ', saveRecRes._id);
        } catch (error) {
            resposeJson.message = error;
            console.log(error, 'Rec at ', k);
            resposeJson.isSuccess = false;
            resposeJson.invalidRecordAt = k + 1;
            return res.json(resposeJson);
        }
    }

    if (resposeJson.isSuccess) {
        resposeJson.message = CONSTANTS.CUST_FILE_SAVED_SUCCESS;
        return res.json(resposeJson);
    } else {
        resposeJson.message = CONSTANTS.APP_UNKNOWN_ERROR_MESSAGE;
        console.log(resposeJson.message)
        return res.json(resposeJson);
    }
}));


module.exports = router;