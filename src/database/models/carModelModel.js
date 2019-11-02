const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const carBrandModelSchema = new Schema({
    name: String,
    carBrandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carBrands',
        required: true
    }
})

module.exports = mongoose.model('carModels', carBrandModelSchema)