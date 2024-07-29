const express = require('express')
const methodOverride = require('method-override')
require('dotenv').config()
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const userController = require('./controllers/user');
const blogPostController = require('./controllers/blogPost');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth');
// const defineCurrentUser = require('./middleware/defineCurrentUser')
const User = require('./models/User');

// Express Settings
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(bodyParser.json())
// Middleware
app.use(express.json())
app.use(cookieParser())
// app.use(defineCurrentUser)
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


// Routes
app.use('/user', userController)
app.use('/blog', blogPostController)

app.get('/profile', auth, (req, res) => {
    res.json(req.user)
})

// app.get('/profile', async (req, res) => {
//     try {
//         // Split the authorization header into [ 'Bearer', 'TOKEN' ]
//         const [authenticationMethod, token] = req.headers.authorization.split(' ')

//         // Only handle 'Bearer' authorization for now
//         if (authenticationMethod == 'Bearer') {
//             const result = await jwt.decode(process.env.JWT_SECRET, token)

//             const { id } = result.valueOf

//             // Find the user object using their id:
//             let user = await User.findOne({
//                 where: {
//                     _id: id
//                 }
//             })
//             res.json(user)
//         }
//     } catch {
//         res.json(null)
//     }
// })

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err))


// Listen for Connections
const PORT = `${process.env.PORT}`

try {
    app.listen(PORT, () => {
        console.log(`🐚 Listening on ${PORT}`)
    })
} catch (error) {
    console.log('error:', error)
}