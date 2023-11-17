require('dotenv').config()

const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const queueRoutes = require('./routes/queuesRoute')
const userRoutes = require('./routes/usersRoute')
const requireAuth = require('./middleware/requireAuth')
const { login } = require('./controllers/authController')


// express app
const app = express()

// middleware
app.use(express.json())
// Enable CORS for all routes
app.use(cors());


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.post('/auth/', login)

// require auth for all bellow routes: middleware
app.use(requireAuth)

app.use('/api/users', userRoutes)
app.use('/api/queues', queueRoutes)
app.use('/', (req, res) => { res.json({ msg: "Hi there" }) })



// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })