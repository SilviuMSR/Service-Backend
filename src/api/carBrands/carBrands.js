const express = require('express')
const router = express.Router()
const carBrandLogic = require('./carBrandsLogic')

router.route('/')
    .get((req, res) => carBrandLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err)))

    .post((req, res) => carBrandLogic.create(req.body.brand)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

router.route('/:ID')
    .get((req, res) => carBrandLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .put((req, res) => carBrandLogic.update(req.params.ID, req.body.brand)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .delete((req, res) => carBrandLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

module.exports = router