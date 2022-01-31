const express = require('express');
const mangoose = require('mongoose');
const router = express.Router();
const CONSTANTS = require('../util/constant');
const { updateAdminValidation, updateAdminDocument, findAdmins } = require('../models/admin');
const routeErrorHandler = require('../middleware/error-handler');

router.post('/update', routeErrorHandler(async (req, res) => {
    const resposeJson = {
        message: '',
        isSuccess: false,
        adminRec: []
    };
    const adminProfile = req.body;
    const hasAnyError = updateAdminValidation(adminProfile);
    if (hasAnyError) {
        resposeJson.message = hasAnyError;
        res.status(400).json({ resposeJson });
    }
    try {
        const adminResponse = await updateAdminDocument(adminProfile);
        const profile = adminResponse.toObject();
        delete profile['password'];

        resposeJson.message = CONSTANTS.ADMIN_UPDATE_SUCCESS;
        resposeJson.isSuccess = true;
        resposeJson.adminRec.push(adminResponse);
        return res.json(resposeJson);
    } catch (error) {
        console.log('error while updating... : ', error);
        return res.status(400).json(error);
    }
}));

router.post('/search', routeErrorHandler(async (req, res) => {
    const searchReq = req.body;

    if (!searchReq || (!searchReq._id && !searchReq.firstName && !searchReq.email)) {
        return res.status(400).json(CONSTANTS.SEARCH_DATA_NOT_PASSED);
    }
    const resposeJson = {
        message: '',
        isSuccess: false,
        adminRec: []
    };

    try {
        searchReq.mail = searchReq.email;
        delete searchReq.email;

        for(let prop in searchReq) {
            let value = searchReq[prop];
            value = value.trim();
            if(value) {
                searchReq[prop] = new RegExp(value, 'i');
            } else {
                delete searchReq[prop]
            }
        }
        
        if(searchReq._id) {
            searchReq._id = mongoose.Types.ObjectId.fromString(searchReq._id);
        } else {
            delete searchReq._id;
        }
        console.log('search req', searchReq);
        const adminResponse = await findAdmins(searchReq);
        resposeJson.adminRec = adminResponse;
        resposeJson.isSuccess = true;
        return res.json(resposeJson);
    } catch (error) {
        console.log('error while admin searching... : ', error);
        return res.status(400).json(error);
    }
}));

module.exports = router;