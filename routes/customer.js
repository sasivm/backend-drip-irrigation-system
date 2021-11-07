const express = require('express');
const router = express.Router();

const { getCustomerDetails, validateCustomerUpdation, updateCustomerDetails, updateMILandDetails } = require('../models/customer');
const CONSTANTS = require('../util/constant');

router.get('/:id', async (req, res, next) => {
    const resposeJson = {
        message: '',
        isSuccess: true,
        custRec: []
    };
    try {
        const applicationId = req.params.id ?? null;
        if (applicationId) {
            const customerRec = await getCustomerDetails(applicationId);
            resposeJson.custRec = customerRec;
            if (customerRec.length === 0) {
                resposeJson.isSuccess = false;
                resposeJson.message = CONSTANTS.INVALID_APPLICATION_ID;
            }
            return res.json(resposeJson);
        } else {
            resposeJson.isSuccess = false;
            resposeJson.message = CONSTANTS.APPLICATION_ID_NOT_PASSED;
            return res.json(resposeJson);
        }
    } catch (error) {
        console.log('Outer catch');
        resposeJson.isSuccess = false;
        resposeJson.message = error;

        if (CUST_MORETHAN_ONE_CUSTID === error) {
            console.log('Error mactched...')
            return res.json(resposeJson);
        }

        return res.status(404).json(resposeJson);
    }

});

router.post('/updateMILand', async (req, res) => {
    const resposeJson = {
        message: '',
        isSuccess: true,
        custRec: []
    };
    try {
        const { cropLandType, _id } = req.body ?? null;

        if (cropLandType && _id) {
            const miLandRec = {
                cropLandType, _id
            };
            console.log('valid mi record');
            const response = await updateMILandDetails(miLandRec);
            resposeJson.message = CONSTANTS.MI_UPDATE_SUCCESS;
            resposeJson.custRec.push(response);
            return res.json(resposeJson);
        } else {
            resposeJson.isSuccess = false;
            resposeJson.message = CONSTANTS.DATA_NOT_PASSED;
            return res.json(resposeJson);
        }
    } catch (err) {
        console.log('error while updating... : ', err);
        // resposeJson.isSuccess = false;
        // resposeJson.message = error;
        return res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    const resposeJson = {
        message: '',
        isSuccess: true,
        custRec: []
    };
    try {
        const custRecUpdation = req.body ?? null;
        if (custRecUpdation && custRecUpdation['_id']) {
            const isInvalid = validateCustomerUpdation(custRecUpdation);
            if (isInvalid) {
                resposeJson.isSuccess = false;
                resposeJson.message = isInvalid;
                return res.json(resposeJson);
            }
            const response = await updateCustomerDetails(custRecUpdation);
            resposeJson.message = CONSTANTS.CUST_UPDATE_SUCCESS;
            resposeJson.custRec.push(response);
            console.log('cust rec updated');
            return res.json(resposeJson);
        }
        resposeJson.isSuccess = false;
        resposeJson.message = CONSTANTS.DATA_NOT_PASSED;
        res.json(resposeJson);
    } catch (error) {
        console.log('error while updating... : ', error);
        // resposeJson.isSuccess = false;
        // resposeJson.message = error;
        return res.status(400).json(error);
    }

});

module.exports = router;