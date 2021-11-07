const { RESPONSE_HEADERS } = require('../util/res-header-constant');

function headerMiddleware(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader(RESPONSE_HEADERS.ALLOWED_ORIGIN.NAME, RESPONSE_HEADERS.ALLOWED_ORIGIN.VALUE);

    // Request methods you wish to allow
    res.setHeader(RESPONSE_HEADERS.ALLOWED_METHODS.NAME, RESPONSE_HEADERS.ALLOWED_METHODS.VALUE);

    // Request headers you wish to allow
    res.setHeader(RESPONSE_HEADERS.ALLOWED_HEADERS.NAME, RESPONSE_HEADERS.ALLOWED_HEADERS.VALUE);

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('developer', 'sk');
    // Pass to next layer of middleware
    next();
}

module.exports = headerMiddleware;