const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel')

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ status: "error", message: "Authorization token required!" })
    }

    const token = authorization.split(" ")[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = UserModel.findOne({ _id }).select('_id')
        next()

    } catch(err) {
        console.log(err)
        return res.status(401).json({ status: "error", message: "request is not authorized!" })
    }
}

module.exports = requireAuth