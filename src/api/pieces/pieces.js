const express = require('express')
const router = express.Router()
const piecesLogic = require('./piecesLogic')

router.route('/')
    .get((req, res) => piecesLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err)))

    .post((req, res) => piecesLogic.create(req.body.piece)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

router.route('/:ID')
    .get((req, res) => piecesLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .put((req, res) => piecesLogic.update(req.params.ID, req.body.piece)
        .then(response => res.done(response))
        .catch(err => res.err(err)))
    .delete((req, res) => piecesLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err)))

module.exports = router