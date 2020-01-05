const express = require('express')
const router = express.Router()
const logic = require('./loginLogic')

router.route('/')
   .post((req, res) => {
      return logic.login(req.body.username, req.body.password)
         .then(response => {
            req.session.auth = {
               userId: response.id,
               username: response.username
            }
            res.json(response).end()
         })
         .catch(err => res.status(err.status).end())
   })


module.exports = router
