const profileModel = require('./profileSchema');

//Checks if user exists in database, returns info if found and null if not found
function fetchUser (disc_id) {
    return profileModel.findOne({ discord_id: disc_id });
}

//Create a new user (document) in database
async function createUser(disc_id, moodleToken) {
    const profileData = await fetchUser(disc_id);
    
    if (profileData) {
        throw TypeError("The account already exist in the database!");
    }
    const newUser = new profileModel({
        discord_id: disc_id,
        moodle_token: moodleToken,
    })

    await newUser.save();
} 

//Updating a user's moodle token
async function updateUser(disc_id, moodleToken) {
    const profileData = await fetchUser(disc_id);
    
    if (!profileData) {
        throw TypeError("Cannot update non-existing user!");
    }
    
    //Set new moodle token
    profileData.moodle_token = moodleToken;
    await profileData.save();
    console.log("User updated!");
}

module.exports = { createUser, updateUser, fetchUser };