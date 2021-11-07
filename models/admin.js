const mangoose = require('mongoose');
const Joi = require('joi');

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
        role: Joi.string().min(6),
        password: Joi.string().min(6).required()
    });

    const { error } = adminJOISchema.validate(adminProfile);
    if (error) {
        console.log('... Error Ocuured...');
        console.log(error.message);
        return error.message;
    }

    return null;
}

function validateAdminLogin(admin) {
    const loginSchema = Joi.object({
        mail: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = loginSchema.validate(admin);

    if (error) {
        console.log('val error', error.message);
        return error.message;
    }

    return null;
}

module.exports.Admin = Admin;
module.exports.adminValidation = validateAdminProfile;
module.exports.adminLoginValidation =validateAdminLogin;