const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const carBrandSchema = new Schema({
    name: String
})

module.exports = mongoose.model('carBrands', carBrandSchema)