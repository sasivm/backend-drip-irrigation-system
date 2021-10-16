const express = require('express');
const router = express.Router();

const { createCustomer, validateCustomer } = require('../models/multi-customer');
const Constants = require('../util/constant');

const checkPayloadIsValid = (payload) => {
    if (!Array.isArray(payload)) {
        return Constants.INVALID_DATA_FORMAT;
    } else if (payload.length < 1) {
        return Constants.NO_CUST_DATA;
    }

    return null;
};

router.post('/', async (req, res, next) => {
    try {
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
            for (const field of Constants.CUST_REC_REQ_FIELDS) {
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
                const saveRecRes = await createCustomer(validCustRec);
                console.log(k, 'Record Saved: ', saveRecRes._id);
            } catch (error) {
                resposeJson.message = error.message;
                console.log(error.message, 'Rec at ', k);
                resposeJson.isSuccess = false;
                resposeJson.invalidRecordAt = k + 1;
                return res.json(resposeJson);
            }
        }

        if (resposeJson.isSuccess) {
            resposeJson.message = Constants.ALL_REC_SAVED;
            return res.json(resposeJson);
        } else {
            resposeJson.message = 'Something went wrong - uncaught error';
            console.log(resposeJson.message)
            return res.json(resposeJson);
        }
    } catch (error) {
        console.log('Outer catch');
        return next(error);
    }

});


module.exports = router;