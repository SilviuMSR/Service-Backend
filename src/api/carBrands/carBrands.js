const express = require('express')
const router = express.Router()

const { apiSerializer } = require('../../utils/apiSerializer')

const carBrandLogic = require('./carBrandsLogic')

router.route('/')
    .get((req, res) => apiSerializer(carBrandLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err))))

    .post((req, res) => apiSerializer(carBrandLogic.create(req.body.brand)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

router.route('/:ID')
    .get((req, res) => apiSerializer(carBrandLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .put((req, res) => apiSerializer(carBrandLogic.update(req.params.ID, req.body.brand)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .delete((req, res) => apiSerializer(carBrandLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

module.exports = router