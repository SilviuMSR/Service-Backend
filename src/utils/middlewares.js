const statusCodes = require('http-status-codes');
const httpStatus = require('http-status')
const userLogic = require('../api/users/usersLogic')

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
    },
    isLogged: function (req, res, next) {
        if (req.session.auth && req.session.auth.userId) {
            return next();
        }
        return res.status(statusCodes.UNAUTHORIZED).send({ message: 'Unauthorised' });
    }
}