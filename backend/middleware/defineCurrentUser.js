const { User } = require("../models/user")

async function defineCurrentUser(req, res, next) {
    try {
        let user = await User.findOne({_id: req.session._id})
        req.currentUser = user
        next()
    } catch {
        next()
    }
}

module.exports = defineCurrentUser

