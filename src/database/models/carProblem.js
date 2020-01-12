const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const CONSTANTS = require('../../utils/constants')

const carProblemSchema = new Schema({
    name: String,
    difficulty: {
        type: String,
        default: CONSTANTS.PROBLEM_EASY
    },
    steps: [String],
    price: Number,
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('carProblems', carProblemSchema)