const express = require('express')
const router = express.Router()

const { apiSerializer } = require('../../utils/apiSerializer')

const vacationRequestLogic = require('./vacationRequestsLogic')
const vacationRequestFacade = require('./vacationRequestsFacade')

router.route('/')
    .get((req, res) => apiSerializer(vacationRequestLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        },
        employee: req.query.employee
    })
        .then(response => res.done(response))
        .catch(err => res.err(err))))

    .post((req, res) => apiSerializer(vacationRequestFacade.create(req.body.vacationRequest)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

router.route('/:ID')
    .get((req, res) => apiSerializer(vacationRequestLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .put((req, res) => apiSerializer(vacationRequestFacade.update(req.params.ID, req.body.vacationRequest)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .delete((req, res) => apiSerializer(vacationRequestLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

module.exports = router