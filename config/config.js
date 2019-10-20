module.exports = {
    PORT: process.env.PORT || 9000,
    mongo: {
        URL: process.env.MONGO_URL || 'mongodb://localhost/service'
    },
    pagination: {
        FROM: 0,
        LIMIT: 10
    }    
};