const mangoose = require('mongoose');

function MangooseConnection() {
    const { DB_DOMAIN_NAME: host, DB_NAME: db, DOAMIN_EXTRAS: extras } = process.env;
    const MONGODB_URI = host + db + extras;

    mangoose.connect(MONGODB_URI)
        .then(() => {
            console.log('Mongo DB is Connected...');
            console.log('URI is : ', MONGODB_URI);
        })
        .catch(err => {
            console.log('Could not connect to MongoDB...');
            console.log('error-info : ', err)
        });
}

module.exports = MangooseConnection;