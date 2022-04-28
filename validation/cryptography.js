const CryptoJS = require("crypto-js");
const { enc } = require("crypto-js/core");
require("dotenv").config();

//Encrypt:
function encrypt(token) {
	return CryptoJS.AES.encrypt(token, process.env.SECRET_KEY).toString();
}

//Decrypt
function decrypt(token) {
	//Token is converted to bytes
	let bytes = CryptoJS.AES.decrypt(token, process.env.SECRET_KEY);
	//Bytes to string
	let moodleToken = bytes.toString(CryptoJS.enc.Utf8);
	return moodleToken;
}

module.exports = { encrypt, decrypt };
