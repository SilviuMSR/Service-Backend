const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const statusCodes = require('http-status-codes');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config();
const { PORT, mongo } = require('./config/config');
const { notFound, errorHandler, isLogged } = require('./src/utils/middlewares');
const { checkForNotifications } = require('./src/utils/helpers')

const app = express();

app.response.__proto__.done = function (data) {
    if (data) this.status(data.status || statusCodes.OK);
    else this.status(statusCodes.NOT_FOUND);

    this.json(data);
}

app.response.__proto__.err = function (data) {
    console.log(data)
    if (!data.status) data.status = statusCodes.BAD_REQUEST;

    this.status(data.status);
    this.json(data);
}

mongoose.connect(mongo.URL, { useNewUrlParser: true })
    .then(() => {
        app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true
        }));

        app.use(bodyParser.urlencoded({ extended: true, useUnifiedTopology: true }));
        app.use(bodyParser.json());

        app.use(session({
            secret: '1234',
            resave: true,
            saveUninitialized: false
        }));

        checkForNotifications()

        // Routes which can be access without login
        app.use('/static', express.static('files'))
        app.use('/login', require('./src/api/login/login'))
        app.use('/pieces', require('./src/api/pieces/pieces'));
        app.use('/reservations', require('./src/api/reservations/reservations'));
        app.use('/brands', require('./src/api/carBrands/carBrands'));
        app.use('/models', require('./src/api/carModels/carModels'));
        app.use('/problems', require('./src/api/carProblems/carProblems'));

        // Starting from here we can access only if logged in
        app.use(isLogged)
        app.use('/logged', (req, res) => res.status(statusCodes.OK).send({ message: 'Logged', username: req.session.auth ? req.session.auth.username : null, userId: req.session.auth ? req.session.auth.userId : null, position: req.session.auth ? req.session.auth.position : null }));
        app.use('/logout', require('./src/api/logout/logout'))
        app.use('/users', require('./src/api/users/users'));
        app.use('/statistics', require('./src/api/statistics/statistics'));
        app.use('/settings', require('./src/api/settings/settings'));
        app.use('/monitors', require('./src/api/monitors/monitors'));
        app.use('/vacations', require('./src/api/vacationRequests/vacationRequests'));

        app.use(notFound);
        app.use(errorHandler);

        app.listen(PORT, () => console.log(`SERVICE listening on ${PORT}`));
    })
    .catch(e => console.log(e))
