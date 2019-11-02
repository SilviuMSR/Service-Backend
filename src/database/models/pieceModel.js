const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const pieceSchema = new Schema({
    name: String,
    price: Number,
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('pieces', pieceSchema)