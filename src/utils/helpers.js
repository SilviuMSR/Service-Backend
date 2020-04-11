const reservationDatabase = require('../api/reservations/reservationsDatabase')
const CONSTANTS = require('./constants')
const mailService = require('./mail')
const moment = require('moment')

let checkForNotificationsInterval = null

const helpers = {
    checkForNotifications: function (req, res, next) {
        checkForNotificationsInterval = setInterval(async function () {
            console.log("Checking for cars which need revision!")
            const reservations = await reservationDatabase.get()
            const reservationsToSendEmail = reservations.filter(reservation => moment(reservation.createdAt).add(1, 'years').isBefore(moment()))
            const mappedReservations = reservationsToSendEmail.map(reservation => ({ email: reservation.clientEmail, brand: reservation.carBrandId.name, model: reservation.carModelId.name }))
            for (email of mappedReservations) {
                const sentEmail = await mailService.sendMail({
                    to: email.email,
                    subject: 'INFO Revizie',
                    text: `Buna ziua, \n A venit momentul sa faceti revizie masinii ${email.brand} ${email.model}`
                })

                if (sentEmail) {
                    console.log(`Successfully sent email to ${email.email}`)
                }
            }
        }, CONSTANTS.NOTIFICATION_TIME);
    },
    clearNotifications: function (req, res, next) {
        clearInterval(checkForNotificationsInterval)
    }
}

module.exports = helpers