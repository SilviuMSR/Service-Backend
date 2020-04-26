const express = require('express')
const router = express.Router()

const { apiSerializer } = require('../../utils/apiSerializer')

const statisticsFacade = require('./statisticsFacade')

router.route('/reservations')
    .get((req, res) => apiSerializer(statisticsFacade.getForReservations()
        .then(response => res.done(response))
        .catch(err => res.err(err))))

router.route('/employee')
    .get((req, res) => apiSerializer(statisticsFacade.getForEmployee()
        .then(response => res.done(response))
        .catch(err => res.err(err))))

router.route('/carsAndProblems')
    .get((req, res) => apiSerializer(statisticsFacade.getForCarsAndProblems()
        .then(response => res.done(response))
        .catch(err => res.err(err))))

module.exports = router