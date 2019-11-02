const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const carProblemSchema = new Schema({
    name: String,
    steps: [String]
})

module.exports = mongoose.model('carProblems', carProblemSchema)