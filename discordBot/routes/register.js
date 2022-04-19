const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { createUser } = require('../../database/manageUserDB');

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
      `POST request ended: DiscordId: ${discordId} Moodletoken: ${MoodleToken}`
    );
    // TODO: Send til DB og check om bruger findes i forvejen
    await createUser(discordId, MoodleToken);
    res.end();
  });
});

router.put("/:id", (req, res) => {
  res.send({
    body: `PUT method not implemented, user ${Buffer.from(
      req.params.id,
      "base64"
    ).toString("utf-8")} not updated`,
  });
  //TBD
});

router.delete("/:id", (req, res) => {
  res.send({
    body: `DELETE method not implemented, user ${Buffer.from(
      req.params.id,
      "base64"
    ).toString("utf-8")} not deleted`,
  });
  // TODO DB delete user
  //TBD
});

module.exports = router;
