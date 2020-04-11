const express = require('express')
const router = express.Router()
const path = require('path')

const { apiSerializer } = require('../../utils/apiSerializer')

const carBrandLogic = require('./carBrandsLogic')
const { upload, resizeImages } = require('../../utils/multer')

const BRAND_IMAGE_PATH = path.join(__dirname, '..', '..', '..', 'files', 'images', 'brand-images')

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

router.route('/:ID/image')
    .get((req, res) => carBrandLogic.getLogo(req.params.ID).then(logoPath => res.sendFile(logoPath)))
    .post(upload(BRAND_IMAGE_PATH).any(),
        resizeImages(BRAND_IMAGE_PATH),
        (req, res) => apiSerializer(carBrandLogic.uploadLogo(req.params.ID, req.files), res)
    )
    .put(
        upload(BRAND_IMAGE_PATH).any(),
        resizeImages(BRAND_IMAGE_PATH),
        (req, res) => apiSerializer(carBrandLogic.editLogo(req.params.ID, req.files), res)
    )

module.exports = router