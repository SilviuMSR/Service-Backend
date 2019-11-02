const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const reservationSchema = new Schema({
    carBrandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carBrands'
    },
    carModelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carModels'
    },
    clientName: String,
    clientEmail: String,
    status: String, // Accepted / Declined / In progress / Done
})

module.exports = mongoose.model('reservations', reservationSchema)