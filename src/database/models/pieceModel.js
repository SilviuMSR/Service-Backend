const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const pieceSchema = new Schema({
    carBrandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carBrands',
    },
    carModelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carModels',
    },
    name: String,
    price: Number,
    no: Number,
    image: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files' }],
    code: String,
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('pieces', pieceSchema)