const express = require('express')
const methodOverride = require('method-override')
require('dotenv').config()
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const userController = require('./controllers/user');
const blogPostController = require('./controllers/blogPost');
const verifyToken = require('./middleware/auth')

// Express Settings
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(bodyParser.json())

// Middleware
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())


// Routes
app.use('/user', userController)
app.use('/blog', blogPostController)


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