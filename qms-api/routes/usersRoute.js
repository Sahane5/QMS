const express = require('express')

const { registerUser, getUsers } = require('../controllers/usersController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


router.use(requireAuth)

// Register User route
router.post('/register', registerUser)

// GET all users
router.get('/', getUsers)

module.exports = router