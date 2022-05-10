require("dotenv").config();
const mongoose = require("mongoose");

/**
 * Establish connection to MongoDB
 * Will print either succes or error, depending on the result
 * process.env.MONGODB_URI is the connection link, hidden in a .env file
 */
function connectDB() {
	mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => {
			console.log("Connected to the database!");
		})
		.catch((err) => {
			console.log(err);
		});
}

module.exports = { connectDB };
