const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    deleted: Boolean,
    position: String,
    userStatus: String, // Disponibil or On Vacantion
    deleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('users', userSchema)