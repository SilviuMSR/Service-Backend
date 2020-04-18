const reservationDatabase = require('../api/reservations/reservationsDatabase')
const CONSTANTS = require('./constants')
const mailService = require('./mail')
const moment = require('moment')

let checkForNotificationsInterval = null
// default 1 year
let checkTimeMS = CONSTANTS.NOTIFICATION_TIME
let noMonths = 12

const helpers = {
    checkForNotifications: function (req, res, next) {
        console.log("Starting notifications...")
        checkForNotificationsInterval = setInterval(async function () {
            console.log("Checking for cars which need revision!", checkTimeMS)
            const reservations = await reservationDatabase.get()
            const reservationsToSendEmail = reservations.filter(reservation => moment(reservation.createdAt).add(noMonths, 'months').isBefore(moment()))
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
        }, checkTimeMS);
    },
    clearNotifications: message => {
        console.log(message || "Notifications stopped!")
        clearInterval(checkForNotificationsInterval)
        if (message) helpers.checkForNotifications()
    },
    updateSettings: settings => {
        checkTimeMS = settings.checkTime ? settings.checkTime * 2 * 60 * 60 * 1000 : CONSTANTS.NOTIFICATION_TIME
        noMonths = settings.months ? settings.months : 12
        helpers.clearNotifications("Restarting interval...")
    },
    getSettings: () => {
        return {
            checkTime: checkTimeMS / 2 / 60 / 60 / 1000,
            noMonths: noMonths
        }
    }
}

module.exports = helpers