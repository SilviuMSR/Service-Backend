const express = require('express')
const router = express.Router()

const { apiSerializer } = require('../../utils/apiSerializer')

const monitorLogic = require('./monitorsLogic')

router.route('/')
    .get((req, res) => apiSerializer(monitorLogic.get({
        from: Number(req.query.from || 0),
        limit: Number(req.query.limit || 10),
        search: {
            name: req.query.name || ''
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err))))

    .post((req, res) => apiSerializer(monitorLogic.create(req.body.monitor)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

router.route('/:ID')
    .get((req, res) => apiSerializer(monitorLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .put((req, res) => apiSerializer(monitorLogic.update(req.params.ID, req.body.monitor)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .delete((req, res) => apiSerializer(monitorLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

module.exports = router