const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


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
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        minLength: [5, "Password must be at least 5 characters"],
        maxLength: [12, "Password is a maximum of 12 characters"]
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        required: false
    },
    admin: {
        type: Boolean,
        default: false
    }
},
    { toJSON: { virtuals: true } },
    { timestamps: true }
)

userSchema.virtual('blogposts', {
    ref: 'BlogPost',
    localField: '_id',
    foreignField: 'user_id'
})

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

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