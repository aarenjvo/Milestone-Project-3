const express = require('express')
require('dotenv').config()
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const userController = require('./controllers/user')

// Express Settings
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(bodyParser.json())

// Middleware
app.use(express.json())


// Routes
app.use('/user', userController)


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