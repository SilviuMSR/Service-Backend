const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const carBrandModelSchema = new Schema({
    name: String,
    carBrandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carBrands',
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('carModels', carBrandModelSchema)