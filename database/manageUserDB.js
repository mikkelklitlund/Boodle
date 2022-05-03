require("dotenv").config();
const profileModel = require("./profileSchema");
const { encrypt, decrypt } = require("../validation/cryptography");

//Checks if user exists in database, returns info if found and null if not found
async function fetchUser(disc_id) {
	let profile = await profileModel.findOne({ discord_id: disc_id });
	if (!profile) {
		return null;
	}
	profile.moodle_token = decrypt(profile.moodle_token);
	return profile;
}

//Create a new user (document) in database
async function createUser(disc_id, moodle_token) {
	const profileData = await fetchUser(disc_id);

	if (profileData) {
		throw TypeError("The account already exist in the database!");
	}
	const newUser = new profileModel({
		discord_id: disc_id,
		moodle_token: encrypt(moodle_token),
	});

	await newUser.save();
}

//Updating a user's moodle token
async function updateUser(disc_id, moodle_token) {
	const profileData = await fetchUser(disc_id);

	if (!profileData) {
		throw TypeError("Cannot update non-existing user!");
	}
	//Set new moodle token
	profileData.moodle_token = encrypt(moodle_token);
	await profileData.save();
}

//Deleting user (deleting a document)
async function deleteUser(disc_id) {
	const profileData = await fetchUser(disc_id);

	if (!profileData) {
		throw TypeError("User doesn't exist!");
	}
	//Delete user
	await profileData.deleteOne({ discord_id: disc_id });
}

module.exports = { createUser, updateUser, fetchUser, deleteUser };
