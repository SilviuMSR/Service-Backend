const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const monitorSchema = new Schema({
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reservations'
    }
})

module.exports = mongoose.model('monitors', monitorSchema)