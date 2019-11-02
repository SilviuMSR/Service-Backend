const express = require('express')
const router = express.Router()
const userLogic = require('./usersLogic')

router.route('/')
    .get((req, res) => userLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err)))

    .post((req, res) => userLogic.create(req.body.user)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

router.route('/:ID')
    .get((req, res) => userLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .put((req, res) => userLogic.update(req.params.ID, req.body.user)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .delete((req, res) => userLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

module.exports = router