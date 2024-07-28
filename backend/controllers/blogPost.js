const router = require('express').Router()
const BlogPost = require('../models/BlogPost')
const User = require('../models/User')


router.get('/', async (req, res) => {
    const blogs = await BlogPost.find()
    res.json(blogs)
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const blogById = await BlogPost.findById(id).populate({path: 'users', select: ['username', 'age', 'email']})
        res.status(200).json(blogById)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/post', async (req, res) => {
    try {
        const blogPost = await new BlogPost(req.body).save()
        res.json(blogPost)
    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ message: 'error creating blog post'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await BlogPost.findByIdAndUpdate(id, req.body)
        res.json({ message: 'blog post updated'})
    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ message: 'error updating blog post' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await BlogPost.findByIdAndDelete(id)
        res.json({ message: 'successfully deleted blog post' })
    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ message: 'error deleting blog post' })
    }
})


module.exports = router