require('dotenv').config()
const express = require('express')
const app = express()


try {
    app.listen(process.env.PORT, () => {
        console.log(` 🐚 Listening on ${process.env.PORT} `)
    })
} catch (error) {
    console.log('error:', error)
}