const express = require('express')
const router = express.Router()
const path = require('path')

const { apiSerializer } = require('../../utils/apiSerializer')
const { upload, resizeImages } = require('../../utils/multer')

const userLogic = require('./usersLogic')

const USER_IMAGE_PATH = path.join(__dirname, '..', '..', '..', 'files', 'images', 'user-images')

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

router.route('/:ID/image')
    .post(upload(USER_IMAGE_PATH).any(),
        resizeImages(USER_IMAGE_PATH),
        (req, res) => apiSerializer(userLogic.uploadLogo(req.params.ID, req.files), res)
    )

module.exports = router