const mongoose = require('mongoose')

const Schema = mongoose.Schema

const queueSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    token: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Queue', queueSchema)