// // const db = require('../models')
// const jwt = require('jsonwebtoken')

// const { User } = require('../models/User')

// async function defineCurrentUser(req, res, next){
//     try {
//         const [ method, token ] = req.headers.authorization.split(' ')
//         if(method == 'Bearer'){
//             const result = await jwt.decode(process.env.JWT_SECRET, token)
//             const { id } = result.value
//             let user = await User.findOne({ 
//                 where: {
//                     _id: id
//                 }
//             })
//             req.currentUser = user
//         }
//         next()
//     } catch(err){
//         req.currentUser = null
//         next() 
//     }
// }

// module.exports = defineCurrentUser
