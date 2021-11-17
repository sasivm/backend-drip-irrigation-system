const express = require('express');
const router = express.Router();
const CONSTANTS = require('../util/constant');
const { updateAdminValidation, updateAdminDocument } = require('../models/admin');
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

module.exports = router;