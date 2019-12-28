const express = require('express')
const router = express.Router()

const { apiSerializer } = require('../../utils/apiSerializer')

const carModelsLogic = require('./carModelsLogic')

router.route('/')
    .get((req, res) => apiSerializer(carModelsLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err))))

    .post((req, res) => apiSerializer(carModelsLogic.create(req.body.model)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

router.route('/:ID')
    .get((req, res) => apiSerializer(carModelsLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .put((req, res) => apiSerializer(carModelsLogic.update(req.params.ID, req.body.model)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .delete((req, res) => apiSerializer(carModelsLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

router.route('/brand/:BRAND_ID')
    .get((req, res) => apiSerializer(carModelsLogic.getByBrandId(req.params.BRAND_ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

module.exports = router