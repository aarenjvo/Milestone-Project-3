const router = require('express').Router()
const BlogPost = require('../models/BlogPost')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
require('dotenv').config()

router.get('/', async (req, res) => {
    const blogs = await BlogPost.find()
    res.json(blogs)
})

// router.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const blogById = await BlogPost.findById(id).populate({ path: 'users', select: ['username', 'age', 'email'] })
//         res.status(200).json(blogById)
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

router.get('/:blogId', async (req, res) => {
    const { blogId } = req.params
    // if (isNaN(blogId)) {
    //     res.status(404).json({ message: `Invalid id "${blogId}"` })
    // } else {
        const blog = await BlogPost.findById(blogId).populate({ path: 'users', select: ['username', 'age', 'email']})
        if (!blog) {
            res.status(404).json({ message: `Could not find blog with id ${placeId}` })
        } else {
            res.json(blog)
        }
    })

// router.post('/:blogId/post', async (req, res) => {
//     const {blogId} = req.params

//     const blog = await BlogPost.findOne({
//         where: { _id: blogId }
//     })

//     if (!blog) {
//         res.status(404).json({ message: `Could not find blog with id ${blogId}` })
//     }

//     const user = await User.findOne({
//         where: { _id: req.body._id }
//     })

//     if (!user) {
//         res.status(404).json({ message: `Could not find user with id ${req.body._id}` })
//     }

//     const blogPost = await BlogPost.create({
//         ...req.body,
//         _id: _id
//     })

//     res.send({
//         ...blogPost.toJSON()
//     })
// })

router.post('/post', auth, async (req, res) => {
    try {
        const blogPost = await new BlogPost(req.body).save()
        res.json(blogPost)
    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ message: 'error creating blog post'})
    }
})

// router.post('/post', async (req, res) => {
//     const { token } = req.body
//     console.log(req.body)
//     try {
//         const user = await User.findOne({ token })
//         if (user) {
//             console.log('User found!')
//             const verify = jwt.sign(
//                 { id: user._id, token: user.token },
//                 process.env.JWT_SECRET,
//                 {
//                     expiresIn: '1d',
//                 },
//             )

//             user.token = verify

//             // cookie section
//             const options = {
//                 expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//                 httpOnly: true
//             }
//             res.status(201).cookie('token', token, options).json({
//                 success: true,
//                 token,
//                 user
//             })
//         const blogPost = await new BlogPost({
//             user_id: id,
//             title: '',
//             content: ''
//         }).save()
//         res.json(blogPost)
//         }
//     } catch (error) {
//         console.log('Error', error)
//         res.status(500).json({ message: 'error creating blog post'})
//     }
// })

  

// router.post('/post', async (req, res) => {
//     const userId = Number(req.params.user_id)

//     const user = await User.findOne({
//         where: { _id: _id }
//     })

//     if (!user) {
//         return res.status(404).json({ message: `Could not find user with id '${userId}' ` })
//     }

//     let currentUser;
//     try {
//         const [method, token] = req.headers.authorization.split(' ')
//         if (method == 'Bearer') {
//             const result = await jwt.decode(process.env.JWT_SECRET, token)
//             const { id } = result.value
//             currentUser = await User.findOne({
//                 where: {
//                     _id: id 
//                 }
//             })
//         }
//     } catch {
//         currentUser = null
//     }

//     if (!currentUser) {
//         return res.status(404).json({
//             message: `You must be logged in to create a blog`
//         })
//     }
//     const blog = await Blog.create({
//         ...req.body,
//         author: currentUser._id,
//         user_id: userId
//     })

//     res.send({
//         ...blog.toJSON(),
//         author: currentUser
//     })
// })


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await BlogPost.findByIdAndUpdate(id, req.body)
        res.json({ message: 'blog post updated' })
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