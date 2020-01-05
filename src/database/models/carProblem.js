const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const carProblemSchema = new Schema({
    name: String,
    steps: [String],
    price: Number,
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('carProblems', carProblemSchema)