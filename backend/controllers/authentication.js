const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models/User')


router.post('/', async (req, res) => {
    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        res.status(404).json({
            message: `Could not find a user with the provided username and password`
        })
    } else {
        const result = await jwt.decode(process.env.JWT_SECRET, { id: user._id })
        res.json({ user: user, token: result.value })
    }
})


router.get('/profile', async (req, res) => {
    try {
        // Split the authorization header into [ 'Bearer', 'TOKEN' ]
        const [authenticationMethod, token] = req.headers.authorization.split(' ')

        // Only handle 'Bearer' authorization for now
        if (authenticationMethod == 'Bearer') {
            const result = await jwt.decode(process.env.JWT_SECRET, token)

            const { id } = result.valueOf

            // Find the user object using their id:
            let user = await User.findOne({
                where: {
                    id: id
                }
            })
            res.json(user)
        }
    } catch {
        res.json(null)
    }
})

module.exports = router