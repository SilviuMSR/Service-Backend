const database = require('./reservationsDatabase');

module.exports = {
    get: options => {
        return Promise.all([
            database.get(options),
            database.count(options)
        ]).then(promiseArray => Promise.resolve({
            reservations: promiseArray[0],
            count: promiseArray[1]
        }))
    },
    getById: id => database.getById(id),
    create: reservation => database.create(reservation),
    delete: id => database.delete(id),
    update: (id, newReservation) => database.update(id, newReservation)
}