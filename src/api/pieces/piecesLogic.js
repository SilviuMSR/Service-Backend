const database = require('./piecesDatabase');

module.exports = {
    get: options => {
        return Promise.all([
            database.get(options),
            database.count(options)
        ]).then(promiseArray => Promise.resolve({
            pieces: promiseArray[0],
            count: promiseArray[1]
        }))
    },
    getById: id => database.getById(id),
    create: piece => database.create(piece),
    delete: id => database.delete(id),
    update: (id, newPiece) => database.update(id, newPiece)
}