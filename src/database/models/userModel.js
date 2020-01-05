const mongoose = require('mongoose')
const uuid = require('uuid/v1')
const { Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    position: String,
    randomKey: {
        type: String,
        default: uuid()
    },
    userStatus: String, // Disponibil or On Vacantion
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('users', userSchema)