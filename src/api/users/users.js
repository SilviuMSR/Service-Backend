const express = require('express')
const router = express.Router()

const { apiSerializer } = require('../../utils/apiSerializer')

const userLogic = require('./usersLogic')

router.route('/')
    .get((req, res) => apiSerializer(userLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err))))

    .post((req, res) => apiSerializer(userLogic.create(req.body.user)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

router.route('/:ID')
    .get((req, res) => apiSerializer(userLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .put((req, res) => apiSerializer(userLogic.update(req.params.ID, req.body.user)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .delete((req, res) => apiSerializer(userLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

module.exports = router