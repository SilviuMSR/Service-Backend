const statusCodes = require('http-status-codes');

module.exports = {
    notFound: (req, res, next) => {
        let err = new Error('Not found');
        err.status = statusCodes.NOT_FOUND;
        next(err);
    },
    errorHandler: (err, req, res, next) => {
        console.log('Error is', err);
        res.status(err.status || statusCodes.BAD_REQUEST);
        res.json({ error: err });
    }
}