const Joi = require('joi');

const { MultiCustomerRec } = require('../models/multi-customer');

async function findCustomersRecords(request) {
    try {
        const response = await MultiCustomerRec.find(request);
        console.log('found', response.length, 'record');
        return response;
    } catch (error) {
        console.log('Error Stack of Mongo cust search');
        console.log(error);
        return Promise.reject(error.message);
    }
}

function validateCustomersSearch(custRecord) {
    const customerSchema = Joi.object({
        applicationId: Joi.string().allow(''),
        farmerName: Joi.string().allow(''),
        farmerType: Joi.string().allow(''),
        fatherName: Joi.string().allow(''),
        department: Joi.string().allow(''),
        block: Joi.string().allow(''),
        village: Joi.string().allow('')
    });

    const { error } = customerSchema.validate(custRecord);

    if (error) {
        console.log('... Error Ocuured Cust Search validation...');
        console.log(error.message);
        return error.message;
    }

    return null;
}

module.exports = {
    validateCustomersSearch,
    findCustomersRecords
}