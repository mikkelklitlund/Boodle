// Require packages needed
const fs = require("node:fs");
require("dotenv").config();
const { Client, Collection, Intents } = require("discord.js");

const http = require("http");
const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");

// const { createUser } = require("../database/manageUserDB");

let moodleToken;
//explicitly added hostname
const hostname = "127.0.0.1";
// Arbitrary port, should be between 3090-3099
const port = 3090;
// Initialization of Express
const app = express();
// For making files accessible in directory
app.use("/public", express.static("../website"));
app.set("views", path.join(process.cwd(), "../website/resources"));
app.set("view engine", "pug");

// Testing
app.get("/", (req, res) => {
  // res.send('TisTest');
  res.sendFile(path.join(__dirname, "..", "website/resources/webpage.html"));
});

app.post("/", (req, res) => {
  console.log("post");
  let body = "";
  filePath = __dirname + "/data.txt";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", () => {
    // body = JSON.parse(body);
    console.log(body + "\n" + filePath);
    moodleToken = body;
    fs.appendFile(filePath, body, () => {
      res.end();
    });
  });
  // res.send("POST tis test");
});

// Path for registration of Moodle token
app.get("/register/:id/", (req, res) => {
  // res.send(
  //   "Discord id: " +
  //     Buffer.from(req.params.id, "base64").toString("ascii") +
  //     `Discord tag: ${userTag}`
  // );
  // res.sendFile(path.join(__dirname,"..website/resources/webpage.html"));
  res.render("webpage.pug", {
    id: Buffer.from(req.params.id, "base64").toString("utf-8"),
  });

  // TODO: Lav register side.
});
// ?name=:name
app.post("/register/:id/", (req, res) => {
  console.log(
    `POST request from ${Buffer.from(req.params.id, "base64").toString(
      "utf-8"
    )}`
  );

  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status("400").send("Input validation failed");
  }

  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", () => {
    const discordId = body.substring(body.indexOf("=") + 1, body.indexOf("&"));
    const MoodleToken = body.substring(body.lastIndexOf("=") + 1, body.length);
    console.log(
      `POST request ended: DiscordId: ${discordId} Moodletoken: ${MoodleToken}`
    );
    // TODO: Send til DB og check om bruger findes i forvejen
    res.end();
  });
});

/* // Sends BoodleHjemmeside.html on accessing localhost:4000/Boodle
app.get("/Boodle", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/BoodleHjemmeside.html"));
}); */

// Creates HTTPS server
const server = http.createServer(app).listen(port, hostname, () => {
  console.log(`Server Running at http://localhost:${port}`);
});

// Redirects stdin and out to stdout.log
// let access = fs.createWriteStream('./stdout.log', { flags: 'a'});
// process.stdout.write = process.stderr.write = access.write.bind(access);

// process.on('uncaughtException', function(err) {
// 	console.error((err && err.stack) ? err.stack : err);
// });
// Intents for Discord bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Reads files in events folder with js suffix
const eventFiles = fs
  .readdirSync("../discordBot/events")
  .filter((file) => file.endsWith(".js"));
// Dynamic import of events
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
// Dynamic import of commands from commands directory
client.commands = new Collection();

const commandFiles = fs
  .readdirSync("../discordBot/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// Bot responds to commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.BOT_TOKEN);
// console.log(Buffer.from('din mor').toString('base64')); // din mor -> ZGluIG1vcg==
// console.log(Buffer.from('ZGluIG1vcg==','base64').toString('utf8')); // ZGluIG1vcg== -> din mor
module.exports = { moodleToken };
