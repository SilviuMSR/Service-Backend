const database = require('./reservationsDatabase');
const CONSTANTS = require('../../utils/constants')
const mailService = require('../../utils/mail')

logic = {
    get: options => {
        return Promise.all([
            database.get(options),
            database.count(options)
        ]).then(promiseArray => {
            return Promise.resolve({
                reservations: promiseArray[0],
                count: promiseArray[1]
            })
        })
    },
    getByEmployeeId: employeeId => {
        return Promise.all([
            database.getByEmployeeId(employeeId),
            database.countByEmployeeId(employeeId)
        ]).then(promiseArray => {
            return Promise.resolve({
                reservations: promiseArray[0],
                count: promiseArray[1]
            })
        })
    },
    getById: id => database.getById(id),
    create: reservation => database.create(reservation),
    delete: id => database.delete(id),
    update: (id, newReservation) => {
        return database.update(id, newReservation).then(result => {
            if (newReservation.reservationStatus === CONSTANTS.RESERVATION_ACCEPTED) {
                mailService.sendMail({
                    subject: 'Informatii rezervare',
                    to: result.clientEmail,
                    text: 'Rezervarea a fost acceptata. Multumim!'
                })
            }
            if (newReservation.reservationStatus === CONSTANTS.RESERVATION_DECLINED) {
                mailService.sendMail({
                    subject: 'Informatii rezervare',
                    to: result.clientEmail,
                    text: 'Rezervarea nu a fost acceptata. Ne pare rau!'
                })
            }
            return Promise.resolve(result)
        })
    }
}

module.exports = logic