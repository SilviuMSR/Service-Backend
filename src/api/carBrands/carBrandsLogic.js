const database = require('./carBrandsDatabase');

const logic = {
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
    update: (id, newBrand) => database.update(id, newBrand),
    uploadLogo: (id, files) => {
        if (!files || !files[0]) return Promise.reject({ message: 'No file' })
        return database.update(id, { logoPath: `images/brand-images/${files[0].filename}` })
    },
}

module.exports = logic