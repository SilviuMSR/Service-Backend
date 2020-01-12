const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const CONSTANTS = require('../../utils/constants')

const reservationSchema = new Schema({
    carBrandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carBrands',
    },
    carModelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carModels',
    },
    clientName: String,
    clientEmail: String,
    reservationStatus: {
        type: String,
        default: CONSTANTS.RESERVATION_PANDING
    }, // Panding / Accepted / Declined / In progress / Done,
    createdAt: Date,
    price: Number,
    problem: [{ type: mongoose.Schema.Types.ObjectId, ref: 'carProblems' }],
    file: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
})

module.exports = mongoose.model('reservations', reservationSchema)