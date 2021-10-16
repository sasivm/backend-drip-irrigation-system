const express = require('express');
const router = express.Router();

const { validateCustomersSearch, findCustomersRecords } = require('../models/customer-search');

router.post('/', async (req, res) => {
    const resposeJson = {
        message: '',
        isSuccess: true,
        custRec: []
    };
    try {
        const searchReq = req.body;
        if (searchReq) {
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
                resposeJson.message = 'Req is valid';
                resposeJson.custRec = custRecsRes;
                return res.json(resposeJson);
            } else {
                resposeJson.message = 'Req doesnt have any valid query';
                resposeJson.isSuccess = false;
                return res.json(resposeJson);
            }
        } else {
            return res.status(400).json('Req is not valid object...');
        }
    } catch (error) {
        console.log('cust srch outer catch');
        resposeJson.isSuccess = false;
        resposeJson.message = error
        return res.status(400).json(resposeJson);
    }
});

module.exports = router;