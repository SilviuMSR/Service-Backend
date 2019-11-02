const express = require('express')
const router = express.Router()
const monitorLogic = require('./monitorsLogic')

router.route('/')
    .get((req, res) => monitorLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err)))

    .post((req, res) => monitorLogic.create(req.body.monitor)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

router.route('/:ID')
    .get((req, res) => monitorLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .put((req, res) => monitorLogic.update(req.params.ID, req.body.monitor)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .delete((req, res) => monitorLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

module.exports = router