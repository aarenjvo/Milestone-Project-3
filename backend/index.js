const express = require('express')
const methodOverride = require('method-override')
require('dotenv').config()
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const userController = require('./controllers/user');
const blogPostController = require('./controllers/blogPost');
const AuthenticationController = require('./controllers/authentication')
// const User = require('./models/User');
const jwt = require('jsonwebtoken')

const corsOptions = { origin: 'https://milestone-project-3-frontend.onrender.com',
 methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
 allowedHeaders: 'Content-Type,Authorization', 
 credentials: true, };

app.use(cors(corsOptions));

// Express Settings
// app.use(cors({
//     origin: 'https://milestone-project-3-frontend.onrender.com/',
//     credentials: true
// }))

app.use(bodyParser.json())
// Middleware
app.use(express.json())
// app.use(cookieParser())
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
app.use('/authentication', AuthenticationController)

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