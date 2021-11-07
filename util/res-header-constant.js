const RESPONSE_HEADERS = {
    ALLOWED_ORIGIN: {
        NAME: 'Access-Control-Allow-Origin', VALUE: '*'
    },
    ALLOWED_METHODS: {
        NAME: 'Access-Control-Allow-Methods', VALUE: 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    },
    ALLOWED_HEADERS: {
        NAME: 'Access-Control-Allow-Headers', VALUE: 'X-Requested-With, content-type'
    }
};

exports.RESPONSE_HEADERS = RESPONSE_HEADERS;