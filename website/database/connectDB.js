require('dotenv').config();
const mongoose = require('mongoose');

//Establishing connection to the database
function connectDB() {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Connected to the database!')
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = { connectDB };
