const express = require('express')
const methodOverride = require('method-override')
require('dotenv').config()
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
// const session = require('express-session')
const cors = require('cors')
const userController = require('./controllers/user');
const blogPostController = require('./controllers/blogPost');
const AuthenticationController = require('./controllers/authentication')
const defineCurrentUser = require('./middleware/defineCurrentUser')
const User = require('./models/user');
const jwt = require('jsonwebtoken')


// Express Settings

app.set('trust proxy', 1)
app.use(cookieParser())
app.use(bodyParser.json())
app.use(defineCurrentUser)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

console.log('Session Secret:', process.env.SESSION_SECRET)

app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours //
    signed: false

}))

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err))

// Middleware
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


// Routes
app.use('/user', userController)
app.use('/blog', blogPostController)
app.use('/authentication', AuthenticationController)


// Listen for Connections
const PORT = `${process.env.PORT}`

try {
    app.listen(PORT, () => {
        console.log(`🐚 Listening on ${PORT}`)
    })
} catch (error) {
    console.log('error:', error)
}