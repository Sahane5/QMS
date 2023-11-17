const User = require('../models/userModel')

// register a user
const registerUser = async (req, res) => {
    const { userName, password } = req.body

    try {
        const user = await User.register(userName, password)

        res.status(200).json({ userName })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get all users
const getUsers = async (req, res) => {

    const users = await User.find().sort({ createdAt: -1 })

    res.status(200).json(users)
}

module.exports = { registerUser, getUsers }