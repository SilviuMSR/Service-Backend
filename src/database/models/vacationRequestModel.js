const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { VACATION_REQUEST_STATUS: { PENDING } } = require('../../utils/constants')

const vacationRequestSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    from: Date,
    to: Date,
    reason: String,
    requestStatus: {
        default: PENDING,
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('vacationRequests', vacationRequestSchema)