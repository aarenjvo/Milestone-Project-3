const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    }
})

module.exports = mongoose.model('User', userSchema)