const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const fileSchema = new Schema({
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reservations',
        required: true
    },
    originalName: String,
    path: String,
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('files', fileSchema)