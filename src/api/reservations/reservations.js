const express = require('express')
const router = express.Router()
const reservationLogic = require('./reservationsLogic')

router.route('/')
    .get((req, res) => reservationLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err)))

    .post((req, res) => reservationLogic.create(req.body.reservation)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

router.route('/:ID')
    .get((req, res) => reservationLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .put((req, res) => reservationLogic.update(req.params.ID, req.body.reservation)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .delete((req, res) => reservationLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

module.exports = router