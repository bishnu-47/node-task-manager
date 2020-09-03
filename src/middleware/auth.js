const jwt = require('jsonwebtoken')
const User = require('../models/users.js');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // gives Object_id of user
        const user = await User.findOne({ _id: decoded._id , 'tokens.token': token })
                            // ^ checks if that token is still present in tokens array
        if(!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error : "Please authenticate" })
    }
}

module.exports = auth
