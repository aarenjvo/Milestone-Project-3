const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: false,
    },
    stars: {
        type: Number,
        required: true
    },
    rant: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)