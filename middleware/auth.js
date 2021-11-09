const CONSTANTS = require('../util/constant');
const JWT = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const reponseJSON = {
        isSuccess: false,
        message: ''
    };

    let token = req.headers['authorization'];

    if (!token) {
        console.log('Token not passed');
        reponseJSON.message = CONSTANTS.UNAUTHORIZED_ACCESS;
        return res.status(401).json(reponseJSON);
    }

    token = token.split(' ')[1]; // splits the string and storing after Bearer string
    if (!token) {
        console.log('Empty Token passed');
        reponseJSON.message = CONSTANTS.UNAUTHORIZED_ACCESS;
        return res.status(401).json(reponseJSON);
    }

    try {
        const JWT_SEC_CODE = process.env?.JWT_PRIVATE_KEY;
        const decodedPaylod = JWT.verify(token, JWT_SEC_CODE); // payload has admin_id

        if (!decodedPaylod) {
            console.log('Invalid Token passed');
            reponseJSON.message = CONSTANTS.INVALID_TOKEN;
            return res.status(401).json(reponseJSON);
        }
        req.adminName = decodedPaylod.name;
        next();
    } catch (error) {
        console.log('Error while verifing token');
        console.log('Error info: ', error);

        reponseJSON.message = CONSTANTS.INVALID_TOKEN;
        return res.status(401).json(reponseJSON);
    }
}

module.exports = verifyToken;