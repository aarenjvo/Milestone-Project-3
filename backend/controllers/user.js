const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, ...rest } = req.body
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: 'User already registered' })
        }

        user = await new User(req.body).save()

        // generate a token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        })

        return res.status(201).json({
            user: {
                _id: user._id,
                username: user.username,
                age: user.age,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
            },
            token
        })
    } catch (error) {
        console.log('error:', error)
        return res.status(500).json({ message: 'error creating user' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (passwordMatch) {
                const token = jwt.sign(
                    { id: user._id, email: user.email },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '1d',
                    }
                )
                res.status(201).json({
                    user: {
                        _id: user._id,
                        email: user.email,
                        password: user.password
                    },
                    token,
                })
            }
            else {
                return res.status(400).json({ message: 'Incorrect password' })
            }
        }
        else {
            return res.status(400).json({ message: 'No user found with this email' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Login failed' })
    }
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