const express = require('express')
const httpStatus = require('http-status')

const router = express.Router()

router.route('/')
    .post((req, res) => {
        req.session.destroy()
        res.done({ status: httpStatus.OK })
    })


module.exports = router