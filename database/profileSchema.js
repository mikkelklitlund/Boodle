const mongoose = require("mongoose");

/**
 * Creates a new "Schema"/document in mongoDB
 * Creates the structure of each document which will we saved in the db
 */
const profileSchema = new mongoose.Schema(
	{
		discord_id: { type: String, required: true },
		moodle_token: { type: String, required: true }
	},
	{
		timestamps: {
			createdAt: "createdAt",
			updatedAt: "updatedAt"
		}
	}
);

//Makes a collection in mongodb called 'users', which is where each user will be saved
const model = mongoose.model("user", profileSchema);

module.exports = model;
