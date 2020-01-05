const database = require('./carModelsDatabase');

module.exports = {
    get: options => {
        return Promise.all([
            database.get(options),
            database.count(options)
        ]).then(promiseArray => Promise.resolve({
            models: promiseArray[0],
            count: promiseArray[1]
        }))
    },
    getById: id => database.getById(id),
    getByBrandId: id => database.getByBrandId(id),
    create: model => database.create(model),
    delete: id => database.delete(id),
    update: (id, newModel) => database.update(id, newModel)
}