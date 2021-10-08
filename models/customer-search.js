const mangoose = require('mongoose');
const Joi = require('joi');

const CustomerSearch = mangoose.model('customers');

async function findCustomersRecords(request) {
    try {
        const response = await CustomerSearch.find(request);
        return response;
    } catch (error) {
        console.log('Error Stack of Mongo cust search');
        console.log(error);
        return Promise.reject(error.message);
    }
}

function validateCustomersSearch(custRecord) {
    const customerSchema = Joi.object({
        applicationId: Joi.string(),
        farmerName: Joi.string(),
        farmerType: Joi.string(),
        registeredBy: Joi.string(),
        department: Joi.string(),
        block: Joi.string(),
        village: Joi.string()
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
    validateCustomersSearch,
    findCustomersRecords
}