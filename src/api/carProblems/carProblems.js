const express = require('express')
const router = express.Router()

const { apiSerializer } = require('../../utils/apiSerializer')

const carProblemsLogic = require('./carProblemsLogic')

router.route('/')
    .get((req, res) => apiSerializer(carProblemsLogic.get({
        from: Number(req.query.from || 0),
        limit: Number(req.query.limit || 10),
        search: {
            name: req.query.name || ''
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err))))

    .post((req, res) => apiSerializer(carProblemsLogic.create(req.body.problem)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

router.route('/:ID')
    .get((req, res) => apiSerializer(carProblemsLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .put((req, res) => {
        return apiSerializer(carProblemsLogic.update(req.params.ID, req.body, req.query.modifySteps)
            .then(response => res.done(response))
            .catch(err => res.err(err)))
    })
    .delete((req, res) => apiSerializer(carProblemsLogic.delete(req.params.ID, req.query.deleteStep)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

module.exports = router