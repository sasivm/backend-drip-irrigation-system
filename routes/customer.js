const express = require('express');
const router = express.Router();

const { getCustomerDetails, validateCustomerUpdation, updateCustomerDetails } = require('../models/customer');
const { MANY_CUST_ONE_ID } = require('../util/constant');

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
            if(customerRec.length === 0) {
                resposeJson.isSuccess = false;
                resposeJson.message = 'customer id is invalid';
            }
            return res.json(resposeJson);
        } else {
            resposeJson.isSuccess = false;
            resposeJson.message = 'Application id is not passed..';
            return res.json(resposeJson);
        }
    } catch (error) {
        console.log('Outer catch');
        resposeJson.isSuccess = false;
        resposeJson.message = error;

        if (MANY_CUST_ONE_ID.message === error) {
            console.log('Error mactched...')
            return res.json(resposeJson);
        }

        return res.status(404).json(resposeJson);
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
            resposeJson.message = 'Customer details updated successfully';
            resposeJson.custRec.push(response);
            return res.json(resposeJson);
        }
        resposeJson.isSuccess = false;
        resposeJson.message = 'Empty data is sent';
        res.json(resposeJson);
    } catch (error) {
        console.log('error while updating...');
        return res.status(400).json(error.message);
    }

});

module.exports = router;