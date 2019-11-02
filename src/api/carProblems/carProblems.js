const express = require('express')
const router = express.Router()
const carProblemsLogic = require('./carProblemsLogic')

router.route('/')
    .get((req, res) => carProblemsLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err)))

    .post((req, res) => carProblemsLogic.create(req.body.problem)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

router.route('/:ID')
    .get((req, res) => carProblemsLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .put((req, res) => carProblemsLogic.update(req.params.ID, req.body.problem)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .delete((req, res) => carProblemsLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

module.exports = router