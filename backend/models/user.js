const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    blogPostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost'
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    toJSON: { virtuals: true }
})

userSchema.virtual('blogposts', {
    ref: 'BlogPost',
    localField: '_id',
    foreignField: 'user_id'
})

// userSchema.pre('save', function (next) {
//     if (this.isModified('password')) {
//         bcrypt.hash(this.password, 8, (err, hash) => {
//             if (err) return next(err);

//             this.password = hash;
//             next();
//         })
//     }
// })

// userSchema.methods.comparePassword = async function (password) {
//     if (!password) throw new Error('Password is missing, retreat!!');

//     try {
//         const result = await bcrypt.compare(password, this.password)
//         return result;
//     } catch (error) {
//         console.log('Error while comparing password!', error.message)
//     }
// }

    module.exports = mongoose.model('User', userSchema)