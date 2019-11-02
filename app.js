const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const statusCodes = require('http-status-codes');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config();
const { PORT, mongo } = require('./config/config');
const { notFound, errorHandler } = require('./src/utils/middlewares');

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

        app.use('/users', require('./src/api/users/users'));

        app.use(notFound);
        app.use(errorHandler);

        app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
    })
    .catch(e => console.log(e))
