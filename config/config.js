module.exports = {
    PORT: process.env.PORT || 9000,
    mongo: {
        URL: process.env.MONGO_URL || 'mongodb://service_mongo:27017'
    },
    pagination: {
        FROM: 0,
        LIMIT: 10
    },
    encrypt: {
        loginAlgorithm: 'sha256',
        loginOutputType: 'hex'
    },
    sessionSecretKey: '1234',
    sessionName: 'sessionId',
};