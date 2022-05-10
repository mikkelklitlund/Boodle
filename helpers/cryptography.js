const CryptoJS = require("crypto-js");
require("dotenv").config();

/**
 *
 * @param {string} token the moodle token
 * @returns encrypted moodle token
 */
function encrypt(token) {
	return CryptoJS.AES.encrypt(token, process.env.SECRET_KEY).toString();
}

/**
 *
 * @param {string} token the moodle token(in encrypted format)
 * @returns decrypted moodle token
 */
function decrypt(token) {
	//Token is converted to bytes
	let bytes = CryptoJS.AES.decrypt(token, process.env.SECRET_KEY);
	//Bytes to string
	let moodleToken = bytes.toString(CryptoJS.enc.Utf8);
	return moodleToken;
}

module.exports = { encrypt, decrypt };
