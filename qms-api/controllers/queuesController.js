const Queue = require('../models/queueModel')
const mongoose = require('mongoose')

const today = new Date();
today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the beginning of the day

const currentQueue = async (user_id) => {
    return await Queue.findOne({ isActive: true, createdAt: { $gte: today }, user_id }).sort({ token: 1 }).limit(1);
}

// get all queues
const getQueues = async (req, res) => {
    const user_id = req.user._id

    const queues = await Queue.find({
        isActive: true,
        createdAt: { $gte: today },
        user_id
    }).sort({ createdAt: 1 })

    res.status(200).json(queues)
}

// get current queue
const getQueue = async (req, res) => {
    const user_id = req.user._id

    const currentActiveQueue = await currentQueue(user_id);

    res.status(200).json(currentActiveQueue)
}

// next queue
const nextQueue = async (req, res) => {
    const user_id = req.user._id

    const currentActiveQueue = await currentQueue(user_id);
    if (currentActiveQueue === null) {
        return res.status(404).json({ error: 'No Queue available' })
    }

    await Queue.findOneAndUpdate({ _id: currentActiveQueue._id }, {
        isActive: false
    })

    res.status(200).json()
}

// create a new queue
const createQueue = async (req, res) => {
    const { name, phone } = req.body
    const user_id = req.user._id

    // add to the database
    try {
        // Check if createdAt is not set or if it's a new day
        let token = 1;
        if (today < new Date(today.getTime() + 86400000)) {
            // If it's the same day, fetch the latest token from the database and increment it
            const latestQueue = await Queue.findOne({ user_id, createdAt: { $gte: today } }).sort({ token: -1 }).limit(1);
            if (latestQueue) {
                token = latestQueue.token + 1;
            }
        }

        const queue = await Queue.create({ name, phone, token, user_id, isActive: true })

        res.status(201).json(queue)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getQueues,
    getQueue,
    createQueue,
    nextQueue
}