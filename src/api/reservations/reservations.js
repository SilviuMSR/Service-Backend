const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()

const { apiSerializer } = require('../../utils/apiSerializer')

const reservationLogic = require('./reservationsLogic')
const reservationFacade = require('./reservationsFacade')

const pathToFiles = path.join(__dirname, '..', '..', '..', 'files', 'reservation')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pathToFiles)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: storage
});

router.route('/')
    .get((req, res) => apiSerializer(reservationLogic.get({
        from: Number(req.query.from),
        limit: Number(req.query.limit),
        search: {
            name: req.query.name
        },
        employee: req.query.employee
    }), res))

    .post((req, res) => apiSerializer(reservationLogic.create(req.body.reservation), res))

router.route('/employee/:EMPLOYEEID')
    .get((req, res) => apiSerializer(reservationLogic.getByEmployeeId(req.params.EMPLOYEEID), res))

router.route('/:ID')
    .get((req, res) => apiSerializer(reservationLogic.getById(req.params.ID), res))
    .put((req, res) => apiSerializer(reservationLogic.update(req.params.ID, req.body.reservation), res))
    .delete((req, res) => apiSerializer(reservationLogic.delete(req.params.ID), res))

router.route('/:ID/files')
    .put(upload.any(), (req, res) => apiSerializer(reservationFacade.uploadFiles(req.params.ID, req.files), res))

/* Generate invoice*/
router.route('/:ID/generate')
    .post((req, res) => apiSerializer(reservationLogic.generateInvoice(req.params.ID), res))

module.exports = router