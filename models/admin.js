const mangoose = require('mongoose');
const Joi = require('joi');
const Constants = require('../util/constant');

const adminSchema = new mangoose.Schema({
    mail: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    role: { type: String, default: 'admin3' },
    password: { type: String, required: false }
});

const Admin = mangoose.model('admins', adminSchema);

function validateAdminProfile(adminProfile) {
    const adminJOISchema = Joi.object({
        mail: Joi.string().email().required(),
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().allow('', null),
        role: Joi.string().min(5),
        password: Joi.string().min(6).required()
    });

    return schamaAndValueError(adminJOISchema, adminProfile);
}

async function updateAdminDocument(adminRecord) {
    try {
        const resonse = await Admin.findByIdAndUpdate(adminRecord._id,
            { $set: adminRecord }, { new: true }
        );
        if (!resonse) {
            return Promise.reject(Constants.ADMIN_ID_INVALID_MESSAGE);
        }
        return resonse;
    } catch (error) {
        console.log('Error while updting in db... : ', error)
        return Promise.reject(error.message);
    }
}

function validateAdminLogin(admin) {
    const loginSchema = Joi.object({
        mail: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    return schamaAndValueError(loginSchema, admin);
}

function updateAdminValidation(admin) {
    const updateSchema = Joi.object({
        _id: Joi.string().required(),
        mail: Joi.string().email().required(),
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().allow('', null),
        role: Joi.string().min(5)
    });

    return schamaAndValueError(updateSchema, admin);
}

function schamaAndValueError(schemaObject, valueObject) {
    const { error } = schemaObject.validate(valueObject);

    if (error) {
        console.log('val error', error.message);
        return error.message;
    }

    return null;
}

module.exports.Admin = Admin;
module.exports.adminValidation = validateAdminProfile;
module.exports.adminLoginValidation = validateAdminLogin;
module.exports.updateAdminValidation = updateAdminValidation;
module.exports.updateAdminDocument = updateAdminDocument;