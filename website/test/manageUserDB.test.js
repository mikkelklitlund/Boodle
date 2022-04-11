require('dotenv').config();
const db = require('./db');
const { createUser, fetchUser, updateUser } = require('../database/manageUserDB');
const profileModel = require('../database/profileSchema');

beforeAll(async () =>  await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe("Create new user", () => {
    it("Should create a new user", async () => {
        const discord_id = "3452357445";
        const moodle_token = "34ffDSE8439Ujfe8f3jj";
        
        //Creating a new user
        await createUser(discord_id, moodle_token);

        //Searching for one
        const user = await profileModel.findOne({discord_id: discord_id});

        //Comparing results
        expect(user.discord_id).toEqual(discord_id);
        expect(user.moodle_token).toEqual(moodle_token);
        
    })
    describe("Error when", () => {
        it("An existing matches discord id", async () => {
            const discord_id = "3452357445";
            const moodle_token = "34ffDSE8439Ujfe8f3jj";
            
            //Creating an user
            await createUser(discord_id, moodle_token)

            //Expecting createUser() to throw a TypeError, when creating a new user with the same discord id
            await expect(async () => {
                await createUser(discord_id, moodle_token);
            }).rejects.toThrow(TypeError("The account already exist in the database!"))        
        })
    })
})
describe("Fetch user", () => {
    it("Should return a user if there exist one in the database", async () => {
        const discord_id = "3452357445";
        const moodle_token = "34ffDSE8439Ujfe8f3jj"; 

        //first creating user in db (assuming this works correctly, will be tested later on)
        await createUser(discord_id, moodle_token);

        //trying to fetch the newly created user
        const foundUser = await fetchUser(discord_id);

        //compare found user with pre-defined values 
        expect(foundUser.discord_id).toEqual(discord_id);
        expect(foundUser.moodle_token).toEqual(moodle_token);
    })
    it("Should return null if no matching user is found", async () => {
        const discord_id = "3452357445";
        
        //trying to find user (expecting to return null)
        const foundUser = await fetchUser(discord_id);

        //expecting it to be null, since no user was created
        expect(foundUser).toEqual(null);
    })
}) 
describe("Update user", () => {
    it("Should update user with new moodle token", async () => {
        const discord_id = "3452357445";
        const moodle_token = "34ffDSE8439Ujfe8f3jj";
        const new_moodle_token = "fwefwef7823ooavuBDUI7";

        //Creating a new user
        await createUser(discord_id, moodle_token);

        //Fetching the user 
        const firstUser = await fetchUser(discord_id);

        //Trying to update user
        await updateUser(discord_id, new_moodle_token);

        //Fetching updated user
        const updatedUser = await fetchUser(discord_id);

        //Comparing firstUser and updatedUser
        expect(firstUser.moodle_token).not.toEqual(updatedUser.moodle_token);
    })
    describe("Error when", () => {
        it("Cannot find a matching discord id in the database", async () => {
            const discord_id = "3452357445";

            //Expecting updateUser() to throw TypeError, when updating a non existing user
            await expect(async () => {
                await updateUser(discord_id);
            }).rejects.toThrow(TypeError("Cannot update non-existing user!"))            
        })
    })
})
