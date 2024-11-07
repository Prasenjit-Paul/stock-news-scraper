const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

conn.on('connected', () => {
    console.log('Connected to MongoDB');
});

conn.on('error', (err) => {
    console.error('Error connecting to MongoDB', err);
});

conn.once('open', () => {
    console.log('Open to MongoDB');
});

module.exports = conn