const mangoose = require('mongoose');
const Joi = require('joi');
const Constants = require('../util/constant');

const miLandRecSchema = new mangoose.Schema({
    cropType: { type: String, required: true, uppercase: true },
    miType: { type: String, required: true, uppercase: true },
    cropLandType: { type: String, required: false }
});

const surveyCropRecSchema = new mangoose.Schema({
    surveyNo: { type: Array, required: true, min: 1 },
    subDivisionNo: { type: Array, required: true, min: 1 },
    totalArea: { type: Number, required: true, min: 0 },
    appliedArea: { type: Number, required: true, min: 0 },
    surveyAndSubDivNo: { type: String, required: true },
    crop: { type: String, required: true, uppercase: true },
    spacing: { type: String, required: true }
});

const multCustomerRecSchema = new mangoose.Schema({
    applicationId: { type: String, required: true, unique: true },
    block: { type: String, required: true, uppercase: true },
    department: { type: String, required: true },
    district: { type: String, required: true, uppercase: true },
    farmerName: { type: String, required: true, uppercase: true },
    fatherName: { type: String, required: true, uppercase: true },
    farmerType: { type: String, required: true, uppercase: true },
    gender: { type: String, min: 1, max: 1 },
    miCompany: { type: String, required: true },
    mobileNo: { type: String, required: true },
    socialStatus: { type: String, required: true },
    village: { type: String, required: true, uppercase: true },
    irrigationType: { type: String, required: true },
    workOrderDate: { type: String, default: '' },
    miLandRec: { type: miLandRecSchema, required: true },
    surveyCropRec: { type: surveyCropRecSchema, required: true },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, default: '' }
}, {
    timestamps: true
});

const MultiCustomerRec = mangoose.model('Customers', multCustomerRecSchema);

async function createNewCustomer(custDeatilsRec) {
    try {
        const cust_rec = new MultiCustomerRec(custDeatilsRec);
        const existCustRec = await MultiCustomerRec.find({ applicationId: custDeatilsRec.applicationId }).limit(1);

        if (existCustRec && existCustRec.length > 0) {
            console.log('Cus rec already exist');
            return Promise.reject(Constants.CUST_EXIST_MESSAGE);
        }
        const res = await cust_rec.save();
        return res;
    } catch (error) {
        console.log('Error Stack of Mongo save method');
        console.log(error);
        console.log('msg ::: ', error.message);
        return Promise.reject(error.message);
    }
}

function validateMultiCutomerRecordRegistartion(custRecData) {
    const miLandJoiSchema = Joi.object().keys({
        cropType: Joi.string().min(3).required(),
        miType: Joi.string().min(3).required()
    });

    const surveyCropJoiSchema = Joi.object().keys({
        surveyNo: Joi.array().min(1).required(),
        subDivisionNo: Joi.array().min(1).required(),
        totalArea: Joi.number().min(0).required(),
        appliedArea: Joi.number().min(0).required(),
        surveyAndSubDivNo: Joi.string().required(),

        crop: Joi.string().min(1).required(),
        spacing: Joi.string().min(1).required()
    });

    const applicantRecSchema = Joi.object({
        applicationId: Joi.string().min(3).required().label('Application Id'), // Lable to override field name
        block: Joi.string().min(1).required(),
        department: Joi.string().min(1).required(), // Dropdown
        district: Joi.string().min(3).required(),
        farmerName: Joi.string().min(3).required(),
        farmerType: Joi.string().min(1).required(), //Dropdown
        gender: Joi.number().min(1), //Dropdown
        fatherName: Joi.string().required(),
        miCompany: Joi.string().min(1).required(),
        mobileNo: Joi.number().custom(phoneNumValidation),
        socialStatus: Joi.string().min(3).required(),
        village: Joi.string().min(3).required(),
        irrigationType: Joi.string().required(),
        workOrderDate: Joi.string().allow('', null),
        // Mi land and Survey details
        miLandRec: miLandJoiSchema.required().label('Mi Land Details'),
        surveyCropRec: surveyCropJoiSchema.required().label('Survey/Crop Details')
    });

    const { error } = applicantRecSchema.validate(custRecData);

    if (error) {
        console.log('... Error Ocuured...');
        console.log(error);
        return error.message;
    }

    return null;
}

const phoneNumValidation = (value, helpers) => {
    const phoneStr = value + '';
    const numRegEx = /^[0-9]*$/
    if (phoneStr.length === 10 && phoneStr.match(numRegEx)) {
        return value;
    } else {
        return helpers.error(Constants.CUST_PHONE_NO_INVALID_MESSAGE);
    }
};

module.exports = {
    MultiCustomerRec: MultiCustomerRec,
    validateCustomer: validateMultiCutomerRecordRegistartion,
    createCustomer: createNewCustomer
}