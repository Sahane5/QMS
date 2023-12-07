const express = require('express')
const {
  getQueues,
  getQueue,
  createQueue,
  nextQueue
} = require('../controllers/queuesController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()



// GET all queues
router.get('/',requireAuth, getQueues)

// GET current queue
router.get('/current', getQueue)

// PUT next queue
router.get('/next',requireAuth, nextQueue)

// POST a new queue
router.post('/',requireAuth, createQueue)


// // DELETE a queue
// router.delete('/:id', deleteQueue)

// // UPDATE a queue
// router.patch('/:id', updateQueue)

module.exports = router