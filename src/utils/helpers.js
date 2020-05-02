const reservationDatabase = require('../api/reservations/reservationsDatabase')
const CONSTANTS = require('./constants')
const mailService = require('./mail')
const moment = require('moment')

let checkForNotificationsInterval = null
let checkTimeFormat = CONSTANTS.NOTIFICATION_FORMAT
// default 1 day, check for new revisions
let checkTimeMS = CONSTANTS.NOTIFICATION_TIME
// default revision period
let noMonths = 12

const helpers = {
    checkForNotifications: function (req, res, next) {
        console.log("Starting notifications...")
        checkForNotificationsInterval = setInterval(async function () {
            console.log("Checking for cars which need revision!")
            const reservations = await reservationDatabase.get()
            const reservationsToSendEmail = reservations.filter(reservation => moment(reservation.createdAt).add(noMonths, 'months').isBefore(moment()))
            if (!reservationsToSendEmail.length) console.log("There is no car which needs revision!")
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
        switch (settings.checkTimeType.toLowerCase()) {
            case CONSTANTS.NOTIFICATION_FORMAT_TYPE.MINUTES.toLowerCase():
                checkTimeMS = settings.checkTime * 60 * 1000
                break
            case CONSTANTS.NOTIFICATION_FORMAT_TYPE.HOURS.toLowerCase():
                checkTimeMS = settings.checkTime * 60 * 60 * 10000
                break
            case CONSTANTS.NOTIFICATION_FORMAT_TYPE.DAYS.toLowerCase():
                checkTimeMS = settings.checkTime * 60 * 60 * 24 * 10000
                break
        }

        checkTimeFormat = settings.checkTimeType
        noMonths = settings.months ? settings.months : 12
        helpers.clearNotifications("Restarting interval...")
    },
    getSettings: () => {
        const settingsJson = {
            checkTimeType: checkTimeFormat.toLowerCase(),
            noMonths: noMonths
        }

        switch (checkTimeFormat.toLowerCase()) {
            case CONSTANTS.NOTIFICATION_FORMAT_TYPE.MINUTES.toLowerCase():
                settingsJson.checkTime = checkTimeMS / 60 / 1000
                break
            case CONSTANTS.NOTIFICATION_FORMAT_TYPE.HOURS.toLowerCase():
                settingsJson.checkTime = checkTimeMS / 60 / 60 / 10000
                break
            case CONSTANTS.NOTIFICATION_FORMAT_TYPE.DAYS.toLowerCase():
                settingsJson.checkTime = checkTimeMS / 60 / 60 / 24 / 10000
                break
        }

        return settingsJson
    }
}

module.exports = helpers