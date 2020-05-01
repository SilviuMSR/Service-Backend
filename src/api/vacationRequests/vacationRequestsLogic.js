const database = require('./vacationRequestsDatabase');

module.exports = {
    get: options => {
        return Promise.all([
            database.get(options),
            database.count(options)
        ]).then(promiseArray => Promise.resolve({
            vacationRequests: promiseArray[0],
            count: promiseArray[1]
        }))
    },
    getById: id => database.getById(id),
    create: vacationRequest => database.create(vacationRequest),
    delete: id => database.delete(id),
    update: (id, newVacationRequest) => database.update(id, newVacationRequest)
}