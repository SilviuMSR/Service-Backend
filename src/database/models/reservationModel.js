const mongoose = require('mongoose')
const { Schema } = require('mongoose')

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
    status: {
        type: String,
        default: 'Panding'
    }, // Panding / Accepted / Declined / In progress / Done,
    createdAt: Date,
    price: Number,
    problem: [{ type: mongoose.Schema.Types.ObjectId, ref: 'carProblems' }],
    file: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files' }]
})

module.exports = mongoose.model('reservations', reservationSchema)