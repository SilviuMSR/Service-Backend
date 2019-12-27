const database = require('./monitorsDatabase');

module.exports = {
    get: options => {
        return Promise.all([
            database.get(options),
            database.count(options)
        ]).then(promiseArray => Promise.resolve({
            monitors: promiseArray[0],
            count: promiseArray[1]
        }))
    },
    getById: id => database.getById(id),
    create: monitor => database.create(monitor),
    delete: id => database.delete(id),
    update: (id, newMonitor) => database.update(id, newMonitor)
}