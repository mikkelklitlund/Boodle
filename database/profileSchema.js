require('dotenv').config({path:"../.env"});
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

//Keys for encryption and signing
const encKey = process.env.SOME_32BYTE_BASE64_STRING;
const sigKey = process.env.SOME_64BYTE_BASE64_STRING;

//Create a new 'Schema' (document in mongoDB) - structure of how each user is saved in the database
const profileSchema = new mongoose.Schema({
    discord_id: { type: String, required: true},
    moodle_token: { type: String, required: true},
},
{
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  })

//Encrypt moodle token
profileSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey, encryptedFields: ['moodle_token'] });

//Makes a collection in mongodb called 'profileModels', which is where users will be saved
const model = mongoose.model('user', profileSchema);

module.exports = model;