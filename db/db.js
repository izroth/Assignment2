const mongoose = require('mongoose');
const db = mongoose.connection;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Assignment', {
    //store uri in env variable
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected')
}
).catch(err => console.log(err));

module.exports = db;