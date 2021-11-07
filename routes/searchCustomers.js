const express = require('express');
const router = express.Router();

const { validateCustomersSearch, findCustomersRecords } = require('../models/customer-search');
const CONSTANTS = require('../util/constant');

router.post('/', async (req, res) => {
    const resposeJson = {
        message: '',
        isSuccess: true,
        custRec: []
    };
    try {
        const searchReq = req.body;

        if (!searchReq) {
            return res.status(400).json(CONSTANTS.SEARCH_DATA_NOT_PASSED);
        }
        const reqKeys = Object.keys(searchReq);
        let isAnyKeyValid = false;

        for (const key of reqKeys) {
            if (searchReq[key]) {
                isAnyKeyValid = true;
                break;
            }
        }

        if (isAnyKeyValid) {
            const validReq = {};
            for (const key of reqKeys) {
                if (searchReq[key]) {
                    validReq[key] = searchReq[key];
                }
            }
            const isInvalid = validateCustomersSearch(validReq);
            if (isInvalid) {
                resposeJson.isSuccess = false;
                resposeJson.message = isInvalid;
                return res.json(resposeJson);
            }
            const custRecsRes = await findCustomersRecords(validReq);
            resposeJson.message = CONSTANTS.CUST_SEARCH_SUCCESS_MESSAGE;
            resposeJson.custRec = custRecsRes;
            return res.json(resposeJson);
        } else {
            resposeJson.message = CONSTANTS.SEARCH_DATA_NOT_PASSED;
            resposeJson.isSuccess = false;
            return res.json(resposeJson);
        }
    } catch (error) {
        console.log('cust srch outer catch');
        resposeJson.isSuccess = false;
        resposeJson.message = error
        return res.status(400).json(resposeJson);
    }
});

module.exports = router;