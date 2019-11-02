const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    deleted: Boolean,
    status: String // Disponibil or On Vacantion
})

module.exports = mongoose.model('users', userSchema)