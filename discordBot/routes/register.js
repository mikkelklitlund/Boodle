const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { createUser, updateUser, fetchUser, deleteUser } = require('../../database/manageUserDB');




function discordIDValidator(discordId) {
// takes string as input, returns null if not a string, returns true if string contains only regex chars, false otherwise
  if (typeof(discordId) === "string") {
    const regex = /^[0-9]*$/; // only chars in discordId
    if (regex.test(discordId)) return true;
    else return false;
  }
  else return null;
};

function moodleTokenValidator(moodleToken) {
// Same as discordIdValidator, but for moodle token with another regex
  if (typeof(moodleToken) === "string") {
    const regex = /^[0-9a-f]*$/;
    if (regex.test(moodleToken)) return true;
    else return false;
  }
  else return null;
};


router.get("/:id/", (req, res) => {
  // Site generated from /setup command
  res.render("webpage.pug", {
    id: Buffer.from(req.params.id, "base64").toString("utf-8"),
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
    res.status("400").send("Input validation failed");
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
      `POST request ended: DiscordId: ${discordId} Moodletoken: ${MoodleToken}\nBody: ${body}`
    );
    let discValRes = discordIDValidator(discordId);
    let moodleValRes = moodleTokenValidator(MoodleToken);
    if ((discValRes !== true || !discordId) || (moodleValRes !== true || !MoodleToken)) {
      res.status('400').send(`Empty or incorrect Discord id and/or moodle token`);
      return;
    }

    // TODO: Send til DB og check om bruger findes i forvejen
    // console.log(`"${discordId}"`);
    if ( !await fetchUser(discordId)) {
        await createUser(discordId, MoodleToken);
        res.status('201').send('User Created');
    }
    else res.status('400').send('User already exists');
  });
});

router.put("/:id", (req, res) => {

    if (fetchUser(discordId)) {
        updateUser(discordId, MoodleToken);
    res.status('204').send('User updated');
    }
    else res.status('404').send('No such user');
});

router.delete("/:id", async (req, res) => {
  const discordId = Buffer.from(req.params.id, "base64").toString("utf-8");

  let discordIdValRes = discordIDValidator(discordId); 

  if (!discordId || discordIdValRes !== true) {
    res.status('400').send(`Empty or incorrect Discord id and/or moodle token`);
    return;
  };
  
  if ( !await fetchUser(discordId)) {
    res.status('404').send('No such user');
  }
  else {
    await deleteUser(discordId);
    res.status('200').send('User deleted succesfully');
  };
});

module.exports = router;
