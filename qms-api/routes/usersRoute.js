const express = require('express')

const { registerUser, getUsers } = require('../controllers/usersController')

const router = express.Router()

// Register User route
router.post('/register', registerUser)

// GET all users
router.get('/', getUsers)

module.exports = router