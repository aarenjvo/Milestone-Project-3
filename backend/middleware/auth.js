const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    // grab token from cookie
    console.log(req.cookies)
    const { token } = req.cookies
    // if no token, stop there
    if (!token) {
        res.status(403).send('Please login first')
    }
    // decode that token and get id
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        console.log(decode)
        console.log('Successfully verified token!')
    } catch (error) {
        console.log(error)
        res.status(401).send('Invalid token')
    }
    // query to DB for that user id

    return next()
}

module.exports = auth