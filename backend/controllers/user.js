const router = require('express').Router()
const User = require('../models/User')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)
    // res.send('hello')
})

router.post('/', async (req, res) => {
    if (!req.body.profilePicture) req.body.profilePicture = undefined
    const user = await new User(req.body).save()
    res.json(user)
})

module.exports = router