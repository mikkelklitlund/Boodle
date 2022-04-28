require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

//Create a new 'Schema' (document in mongoDB) - structure of how each user is saved in the database
const profileSchema = new mongoose.Schema(
	{
		discord_id: { type: String, required: true },
		moodle_token: { type: String, required: true },
	},
	{
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updatedAt",
		},
	}
);

//Makes a collection in mongodb called 'profileModels', which is where users will be saved
const model = mongoose.model("user", profileSchema);

module.exports = model;
