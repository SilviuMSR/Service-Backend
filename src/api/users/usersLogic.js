const database = require('./usersDatabase');

module.exports = {
    get: options => {
        return Promise.all([
            database.get(options),
            database.count(options)
        ]).then(promiseArray => Promise.resolve({
            users: promiseArray[0],
            count: promiseArray[1]
        }))
    },
    getById: id => database.getById(id),
    getEmployees: () => database.getEmployees(),
    create: user => database.create(user),
    delete: id => database.delete(id),
    update: (id, newUser) => database.update(id, newUser)
}