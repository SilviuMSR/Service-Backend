const statusCodes = require('http-status')

const reservationLogic = require('./reservationsLogic')
const fileLogic = require('../files/filesLogic')

module.exports = {
    uploadFiles: async (reservationId, files) => {
        if (files.length < 1) return Promise.reject({ status: statusCodes.UNPROCESSABLE_ENTITY, message: 'NO FILE' })

        try {
            let reservation = await reservationLogic.getById(reservationId)

            if (!reservation) return Promise.reject({ status: statusCodes.NOT_FOUND, message: 'NOT FOUND' })

            let repetitiveInsert = (index, callback) => {

                if (!files[index]) return callback()

                return fileLogic.create({
                    reservationId: reservationId,
                    originalName: files[index].originalname,
                    path: files[index].path
                }).then(file => {
                    let filesArray = reservation.file.push(file._id)
                    return reservationLogic.update(reservation._id, { file: filesArray, ...reservation })
                        .then(() => {
                            console.log(`Inserted file nr ${index}`)
                            return repetitiveInsert(index + 1, callback)
                        })
                        .catch(err => console.log(err))
                })
            }

            return repetitiveInsert(0, () => Promise.resolve({ message: 'Uploaded' }))
        } catch (err) {
            let status = {}

            if (err.status) status = err.status

            return Promise.reject({
                ...status,
                err
            })
        }
    }
}