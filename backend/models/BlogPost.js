const mongoose = require('mongoose')

const blogPostSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // author: {
    //     type: String,
    //     required: false
    // },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
{toJSON: { virtuals: true }}
)

blogPostSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'blogPostId'
})

module.exports = mongoose.model('BlogPost', blogPostSchema)