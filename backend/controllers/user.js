const router = require('express').Router()
const User = require('../models/User')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ message: 'error retrieving user' })
    }
})

router.post('/', async (req, res) => {
    try {
        if (!req.body.profilePicture) req.body.profilePicture = undefined
        const user = await new User(req.body).save()
        res.status(201).json(user)
    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ message: 'error creating user' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.json({ message: 'user deleted' })
    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ message: 'error deleting user' })
    }
})

module.exports = router