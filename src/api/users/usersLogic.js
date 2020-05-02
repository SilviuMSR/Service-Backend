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
    update: (id, newUser) => database.update(id, newUser),
    uploadLogo: (id, files) => {
        if (!files || !files[0]) return Promise.reject({ message: 'No file' })
        return database.update(id, { photoPath: `images/user-images/${files[0].filename}` })
    },
}