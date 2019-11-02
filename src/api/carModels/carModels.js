const express = require('express')
const router = express.Router()
const carModelsLogic = require('./carModelsLogic')

router.route('/')
    .get((req, res) => carModelsLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err)))

    .post((req, res) => carModelsLogic.create(req.body.model)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

router.route('/:ID')
    .get((req, res) => carModelsLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .put((req, res) => carModelsLogic.update(req.params.ID, req.body.model)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .delete((req, res) => carModelsLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

module.exports = router