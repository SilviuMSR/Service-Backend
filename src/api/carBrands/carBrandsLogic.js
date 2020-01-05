const database = require('./carBrandsDatabase');

module.exports = {
    get: options => {
        return Promise.all([
            database.get(options),
            database.count(options)
        ]).then(promiseArray => Promise.resolve({
            brands: promiseArray[0],
            count: promiseArray[1]
        }))
    },
    getById: id => database.getById(id),
    create: brand => database.create(brand),
    delete: id => database.delete(id),
    update: (id, newBrand) => database.update(id, newBrand)
}