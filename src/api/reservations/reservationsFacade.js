const statusCodes = require('http-status')
const path = require('path')

const reservationLogic = require('./reservationsLogic')
const fileLogic = require('../files/filesLogic')
const carProblemsLogic = require('../carProblems/carProblemsLogic')
const mailService = require('../../utils/mail')
const pdfService = require('../../utils/pdf')

const invoicePdfPath = path.join(__dirname, '..', '..', '..', 'files', 'invoices')

facade = {
    uploadFiles: async (reservationId, files) => {
        if (files.length < 1) return Promise.reject({ status: statusCodes.UNPROCESSABLE_ENTITY, message: 'NO FILE' })

        try {
            let reservation = await reservationLogic.getById(reservationId)

            if (!reservation) return Promise.reject({ status: statusCodes.NOT_FOUND, message: 'NOT FOUND' })

            let repetitiveInsert = (index, callback) => {

                if (!files[index]) return callback()

                return fileLogic.create({
                    reservationId: reservationId,
                    customName: files[index].customName,
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
    },
    create: reservation => {
        if (!reservation.problems) return reservationLogic.create(reservation)

        let reservationPrice = 0

        reservation.problems.forEach(problem => {
            reservationPrice = reservationPrice + problem.price
        })

        return reservationLogic.update(reservation._id, { price: reservationPrice, ...reservation })
    },
    generateInvoice: async reservationId => {
        try {
            const reservation = await logic.getById(reservationId)

            let pdfPath = await pdfService.createInvoicePdf({
                carBrand: reservation.carBrandId.name,
                carModel: reservation.carModelId.name,
                clientName: reservation.clientName,
                price: reservation.price
            }, invoicePdfPath)

            await mailService.sendMail({
                to: reservation.clientEmail,
                subject: 'Factura rezervare',
                text: 'Mai jos gasiti atasata factura!',
                attachments: [
                    {
                        filename: 'Factura.pdf',
                        path: pdfPath.name
                    }
                ]
            })

            let fileToUpload = {
                originalname: pdfPath.name.split('/')[pdfPath.name.split('/').length - 1],
                path: pdfPath.name,
                customName: `Factura-${reservation.clientName}.pdf`
            }

            await facade.uploadFiles(reservationId, Array(fileToUpload))

            return Promise.resolve({ generated: true })
        } catch (err) {
            console.log("ERR", err)
        }
    }
}

module.exports = facade