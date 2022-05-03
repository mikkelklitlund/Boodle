const { encrypt, decrypt } = require("../validation/cryptography");

test("Moodle token encryption", () => {
	const moodleToken = "aklej434tin23faofpov89";

	//Expecting encrypted moodle token to not match moodle token
	expect(encrypt(moodleToken)).not.toEqual(moodleToken);
});

test("Moodle token decryption", () => {
	const moodleToken = "aklej434tin23faofpov89";
	//Encrypts moodle token
	const moodleTokenEnc = encrypt(moodleToken);

	//Expecting decryption of the encrypted Moodle token will match MoodleToken
	expect(decrypt(moodleTokenEnc)).toEqual(moodleToken);
});
