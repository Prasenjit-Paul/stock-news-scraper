const mongoose = require('mongoose');
const conn = require('./mongo.db')

const linksSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        default: 'pending'
    }
}, {
    timestamps: {
        currentTime: () => new Date().getTime() + 5.5 * 60 * 60 * 1000,
    }
})

const Links = conn.model('links', linksSchema);

module.exports = Links;