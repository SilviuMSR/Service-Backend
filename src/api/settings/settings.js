const express = require('express')
const router = express.Router()

const { apiSerializer } = require('../../utils/apiSerializer')

const settingsLogic = require('./settingsLogic')

router.route('/')
    .get((req, res) => apiSerializer(settingsLogic.get()
        .then(response => res.done(response))
        .catch(err => res.err(err))))

    .post((req, res) => apiSerializer(settingsLogic.update(req.body.settings)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

router.route('/start')
    .post((req, res) => apiSerializer(settingsLogic.start()
        .then(response => res.done(response))
        .catch(err => res.err(err))))

router.route('/stop')
    .post((req, res) => apiSerializer(settingsLogic.stop()
        .then(response => res.done(response))
        .catch(err => res.err(err))))

module.exports = router