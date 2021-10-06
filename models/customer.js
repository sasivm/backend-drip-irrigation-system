const mangoose = require('mongoose');
const Joi = require('joi');
const Constants = require('../util/constant');
const { MultiCustomerRec } = require('../models/multi-customer');

const custSchema = new mangoose.Schema({
    applicationId: { type: String, required: true },
    block: { type: String, required: true },
    department: { type: String, required: true },
    district: { type: String, required: true },
    farmerName: { type: String, required: true },
    farmerType: { type: String, required: true },
    gender: { type: String, min: 1, max: 1 },
    miCompany: { type: String, required: true },
    mobileNo: { type: String, required: true },
    socialStatus: { type: String, required: true },
    village: { type: String, required: true },

    // New Fields for updation
    aadhaarNo: { type: String, required: true },
    landOwnSon: { type: String, required: true },
    landOwnership: { type: String, required: true },
    gender: { type: String, default: 'M' }
});

const Customer = mangoose.model('customers', custSchema);

async function updateCustomerDetails(customerRec) {
    try {
        const resonse = await Customer.findByIdAndUpdate(customerRec._id, {
            $set: {
                aadhaarNo: customerRec.aadhaarNo,
                landOwnSon: customerRec.landOwnSon,
                landOwnership: customerRec.landOwnership,
                gender: customerRec.gender
            }
        }, { new: true });

        if (!resonse) {
            return Promise.reject('Invalid Customer id');
        }
        return resonse;
    } catch (error) {
        return Promise.reject(error.message);
    }
}

async function getCustomerDetails(applicationId) {
    try {
        const cusRec = await MultiCustomerRec.find({ applicationId: applicationId });
        if (cusRec && cusRec.length > 1) {
            console.log(cusRec.length, 'Cus found with same id');
            return Promise.reject(Constants.MANY_CUST_ONE_ID.message);
        }
        return cusRec;
    } catch (error) {
        console.log('Error while retrive cust rec from Mongo db');
        console.log(error);
        return Promise.reject(error.message);
    }
}

function validateCustomerUpdation(custRecord) {
    const customerSchema = Joi.object({
        aadhaarNo: Joi.string().min(4).required(),
        landOwnSon: Joi.string().min(1).required(),
        landOwnership: Joi.string().min(1).required(),
        gender: Joi.string().min(1).required(),
        _id: Joi.string().min(1).required()
    });

    const { error } = customerSchema.validate(custRecord);

    if (error) {
        console.log('... Error Ocuured...');
        console.log(error.message);
        return error.message;
    }

    return null;
}

module.exports = {
    getCustomerDetails,
    updateCustomerDetails,
    validateCustomerUpdation
}