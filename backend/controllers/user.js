const router = require('express').Router()
const User = require('../models/user')
const BlogPost = require('../models/BlogPost')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const auth = require('../middleware/auth')
require('dotenv').config()
// const verifyToken = require('../middleware/auth')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).populate({ path: 'blogposts', select: ['title', 'description'] })
        res.status(200).json(user)
    } catch (error) {
        console.log('Error', error)
        res.status(400).json({ message: 'error retrieving user' })
    }
})

router.post('/', async (req, res) => {
    let { password, ...rest } = req.body
    const user = await new User(req.body).save()
    res.json(user)
})

router.post('/:id/blogs', async (req, res) => {
    const { id } = req.params

    const user = await User.findOne({ _id: id })

    if (!user) {
        res.status(404).json({ message: `Could not find place with id "${id}"` })
    }

    let currentUser;
    try {
        currentUser = await User.findOne({ _id: req.session._id})
    } catch {
        currentUser = null
    }

    if (!currentUser) {
        return res.status(404).json({
            message: `You must be logged in to create a blog`
        })
    }

    // const author = await User.findOne({ _id: req.body.user_id })

    // if (!author) {
    //     res.status(404).json({ message: `Could not find author with id "${req.body.user_id}"` })
    // }

    const blog = await BlogPost.create({
        ...req.body,
        user_id: id,
    })

    res.send({
        ...blog.toJSON(),
        author: currentUser
    })
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndUpdate(id, req.body)
        res.json({ message: 'user updated' })
    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ message: 'error updating user' })
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