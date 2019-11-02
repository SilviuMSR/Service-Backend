const express = require('express')
const router = express.Router()

const { apiSerializer } = require('../../utils/apiSerializer')

const piecesLogic = require('./piecesLogic')

router.route('/')
    .get((req, res) => apiSerializer(piecesLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        }
    })
        .then(response => res.done(response))
        .catch(err => res.err(err))))

    .post((req, res) => apiSerializer(piecesLogic.create(req.body.piece)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

router.route('/:ID')
    .get((req, res) => apiSerializer(piecesLogic.getById(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .put((req, res) => apiSerializer(piecesLogic.update(req.params.ID, req.body.piece)
        .then(response => res.done(response))
        .catch(err => res.err(err))))
    .delete((req, res) => apiSerializer(piecesLogic.delete(req.params.ID)
        .then(response => res.done(response))
        .catch(err => res.err(err))))

module.exports = router