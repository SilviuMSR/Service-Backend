const database = require('./carBrandsDatabase');
const fs = require('fs');

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
        return database.update(id, { logoPath: files[0].path })
    },
    editLogo: (id, files) => {
        if (!files || !files[0]) return Promise.reject({ message: 'No file' })
        return logic.getById(id).then(brand => new Promise((resolve, reject) => {
            let editPromise = () => database.update(id, { logoPath: files[0].path })
            fs.exists(brand.logoPath, exists => {
                if (exists)
                    fs.unlink(brand.logoPath, err => {
                        if (!err) return editPromise()
                            .then(resolve)
                            .catch(reject)
                        else return reject({ message: 'Cannot delete file' })
                    })
                else return editPromise()
                    .then(resolve)
                    .catch(reject)
            })
        }))
    },
    getLogo: id => database.getById(id)
        .then(brand => {
            if (!brand.logoPath) {
                return Promise.reject({ message: 'No image uploaded' })
            }
            return Promise.resolve(brand.logoPath)
        })
}

module.exports = logic