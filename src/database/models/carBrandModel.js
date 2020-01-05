const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const carBrandSchema = new Schema({
    name: String,
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('carBrands', carBrandSchema)