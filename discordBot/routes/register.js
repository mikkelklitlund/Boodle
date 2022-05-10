const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const {
	createUser,
	updateUser,
	fetchUser
} = require("../../database/manageUserDB");
const {
	moodleTokenValidator,
	discordIDValidator
} = require("../../helpers/validation");

router.get("/:id/", async (req, res) => {
	// Site generated from /setup command
	const profile = await fetchUser(req.params.id);
	if (profile) {
		return res.status("409").send("User already exists");
	}
	res.render("webpage.pug", {
		id: Buffer.from(req.params.id, "base64").toString("utf-8")
	});
});

router.post("/:id/", (req, res) => {
	console.log(
		`POST request from ${Buffer.from(req.params.id, "base64").toString(
			"utf-8"
		)}`
	);
	// Input validation
	const error = validationResult(req);
	if (!error.isEmpty()) {
		return res.status("400").send("Input validation failed");
	}

	let body = "";
	req.on("data", (data) => {
		body += data;
	});
	// Parses POST request
	req.on("end", async () => {
		const discordId = body.substring(body.indexOf("=") + 1, body.indexOf("&"));
		const MoodleToken = body.substring(body.lastIndexOf("=") + 1, body.length);
		console.log(
			`POST request ended: DiscordId: ${discordId} Moodletoken: ${MoodleToken}`
		);
		let discValRes = discordIDValidator(discordId);
		let moodleValRes = moodleTokenValidator(MoodleToken);
		if (
			discValRes !== true ||
			!discordId ||
			moodleValRes !== true ||
			!MoodleToken
		) {
			res
				.status("400")
				.send(`Empty and/or incorrect Discord id and/or moodle token`);
			return;
		}

		// TODO: Send til DB og check om bruger findes i forvejen
		// console.log(`"${discordId}"`);
		const profile = await fetchUser(discordId);
		if (!profile) {
			await createUser(discordId, MoodleToken);
			return res.status("201").send("User created");
			/*
			res.render("webpage.pug", {
				id: Buffer.from(req.params.id, "base64").toString("utf-8"),
			});
			*/
		} else return res.status("400").send("User already exists");
	});
});

router.put("/:id", async (req, res) => {
	const profile = await fetchUser(discordId);
	if (profile) {
		updateUser(discordId, MoodleToken);
		res.status("204").send("User updated");
	} else res.status("404").send("No such user");
});

router.delete("/:id", async (req, res) => {
	const discordId = Buffer.from(req.params.id, "base64").toString("utf-8");

	let discordIdValRes = discordIDValidator(discordId);

	if (!discordId || discordIdValRes !== true) {
		res.status("400").send(`Empty or incorrect Discord id and/or moodle token`);
		return;
	}

	const profile = await fetchUser(discordId);
	if (!profile) {
		res.status("404").send("No such user");
	} else {
		await deleteUser(discordId);
		res.status("200").send("User deleted succesfully");
	}
});

module.exports = router;
