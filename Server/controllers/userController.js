const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.login(email, password)
        const name = user?.name

        const token = createToken(user._id)
        return res.status(200).json({ email, name, token })
    } catch (err) {
        console.error(err)
        return res.status(400).json({ status: 'error', message: err.message })
    }
}

const signupUser = async (req, res) => {
    try {
        const { email, name, password } = req.body
        const user = await UserModel.signup(name, email, password)

        const token = createToken(user._id)
        return res.status(200).json({ email, name, token })
    } catch (err) {
        console.error(err)
        return res.status(400).json({ status: 'error', message: err.message })
    }
}

module.exports = { loginUser, signupUser }