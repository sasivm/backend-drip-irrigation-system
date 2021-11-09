const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const CONSTANTS = require('../util/constant');
const verifyToken = require('../middleware/auth');

const { Admin, adminValidation, adminLoginValidation } = require('../models/admin');

router.post('/login', async (req, res) => {
    const admin = req.body;
    const resposeJson = {
        message: '',
        isSuccess: false
    };
    if (!(admin.mail && admin.password)) {
        resposeJson.message = CONSTANTS.LOGIN_EMAIL_PASS_REQ;
        return res.status(400).json(resposeJson);
    }

    const isAdminError = adminLoginValidation(admin);

    if (isAdminError) {
        resposeJson.message = isAdminError;
        return res.status(400).json(resposeJson);
    }

    const adminResponse = await Admin.findOne({ mail: admin.mail });
    if (!adminResponse) {
        console.log('login : admin not found');
        resposeJson.message = CONSTANTS.LOGIN_FAILED_MESSAGE;
        return res.status(400).json(resposeJson);
    }

    const validPassword = await bcrypt.compare(admin.password, adminResponse.password);
    if (!validPassword) {
        console.log('password not matched');
        resposeJson.message = CONSTANTS.LOGIN_FAILED_MESSAGE;
        return res.status(400).json(resposeJson);
    }

    try {
        const JWT_SEC_CODE = process.env.JWT_PRIVATE_KEY;
        const payload = { _id: adminResponse._id, name: adminResponse.firstName };
        const token = JWT.sign(payload, JWT_SEC_CODE);

        const adminObject = adminResponse.toObject(); // converting model to plain object
        delete adminObject.password; // removing password prop from admin before sending client

        resposeJson.isSuccess = true;
        resposeJson.message = CONSTANTS.LOGIN_SUCCESS_MESSAGE;
        resposeJson.token = token;
        resposeJson.adminRec = [adminObject];

        console.log('Admin Logged In : ', adminObject.firstName);
        res.json(resposeJson);
    } catch (error) {
        console.log('Error while generating token');
        console.log('Error info: ', error);
        resposeJson.message = CONSTANTS.APP_UNKNOWN_ERROR_MESSAGE;
        return res.status(400).json(resposeJson);
    }
});

router.post('/registration', verifyToken, async (req, res) => {
    const adminProfile = req.body;
    const resposeJson = {
        message: '',
        isSuccess: false,
        adminRec: []
    };

    const isValid = adminValidation(adminProfile);
    if (isValid) {
        resposeJson.message = isValid;
        return res.status(400).json(resposeJson);
    }

    const response = await Admin.findOne({ mail: adminProfile.mail });
    if (response) {
        resposeJson.message = CONSTANTS.REG_EMAIL_EXIST;
        return res.status(400).json(resposeJson);
    }

    const salt = await bcrypt.genSalt(10);
    adminProfile.password = await bcrypt.hash(adminProfile.password, salt);

    const admin = new Admin({
        mail: adminProfile.mail,
        firstName: adminProfile.firstName,
        lastName: adminProfile.lastName,
        role: adminProfile.role,
        password: adminProfile.password
    });

    admin.save(); // Saving admin details to DB with hased password

    resposeJson.message = CONSTANTS.REG_SUCCESS_MESSAGE;
    resposeJson.adminRec.push(admin);
    resposeJson.isSuccess = true;
    res.json(resposeJson);
});

module.exports = router;