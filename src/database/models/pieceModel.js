const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const pieceSchema = new Schema({
    name: String,
    price: Number
})

module.exports = mongoose.model('pieces', pieceSchema)