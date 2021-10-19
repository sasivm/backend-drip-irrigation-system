const mangoose = require('mongoose');
const Joi = require('joi');
const Constants = require('../util/constant');
const { MultiCustomerRec } = require('../models/multi-customer');

const miLandSchema = mangoose.Schema({
    cropLandType: { type: String, required: true },
    updatedBy: { type: String, required: true },
    updatedAt: { type: Date, required: true }
});

const custSchema = new mangoose.Schema({
    isCompleted: { type: Boolean, default: false },

    // New Fields for updation
    aadhaarNo: { type: String, required: true },
    landOwnSon: { type: String, required: true },
    landOwnership: { type: String, required: true },
    gender: { type: String, default: 'M' },

    miLandRec: { type: miLandSchema, required: true },
    updatedBy: { type: String, required: true },
    updatedAt: { type: Date, required: true }
});

const Customer = mangoose.model('customers', custSchema);

async function updateMILandDetails(customerRec) {
    try {
        const resonse = await Customer.findByIdAndUpdate(customerRec._id, {
            $set: {
                'miLandRec.cropLandType': customerRec.cropLandType,
                'miLandRec.updatedBy': 'Sasi66',
                'miLandRec.updatedAt': Date.now()
            }
        }, { new: true, upsert: true });

        if (!resonse) {
            return Promise.reject('Invalid Customer id');
        }
        return resonse;
    } catch (error) {
        console.log('Error while updting in db... : ', error)
        return Promise.reject(error.message);
    }
}

async function updateCustomerDetails(customerRec) {
    try {
        const resonse = await Customer.findByIdAndUpdate(customerRec._id, {
            $set: {
                aadhaarNo: customerRec.aadhaarNo,
                landOwnSon: customerRec.landOwnSon,
                landOwnership: customerRec.landOwnership,
                gender: customerRec.gender,
                isCompleted: true,
                updatedBy: 'Sasi66',
                updatedAt: Date.now()
            }
        }, { new: true });

        if (!resonse) {
            return Promise.reject('Invalid Customer id');
        }
        return resonse;
    } catch (error) {
        console.log('Error while updting in db... : ', error)
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
        console.log('... Error Ocuured while JOI validation ...');
        console.log(error.message);
        return error.message;
    }

    return null;
}

module.exports = {
    getCustomerDetails,
    updateCustomerDetails,
    validateCustomerUpdation,
    Customer,
    updateMILandDetails
}