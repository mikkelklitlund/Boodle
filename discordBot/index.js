// Discord modules
require("dotenv").config( {path: "../.env"});
const fs = require("node:fs");
const { Client, Collection, Intents } = require("discord.js");

// HTTP server modules
const http = require("http");
const express = require("express");
const path = require("path");
// const { body, validationResult } = require("express-validator");
// All route modules have CRUD capability, but 
const registerRoute = require('./routes/register.js');
const aboutRoute = require('./routes/about.js');
const { body, validationResult } = require("express-validator");


// TODO: Få createUser til at virke
// DB related modules
const { connectDB } = require('../database/connectDB');
const { createUser } = require("../database/manageUserDB");
// Creates connection to database
connectDB();

// let moodleToken;
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

// Creates HTTP server
const server = http.createServer(app).listen(port, hostname, () => {
  console.log(`Server Running at https://fs-21-sw-2-a219a.p2datsw.cs.aau.dk/node0/`);
});

// Moves HTTP methods on /register to ./routes/register.js
app.use('/register', registerRoute);
app.use('/about', aboutRoute);
// TODO: flyt express routing ud af index.js
// Testing
app.get("/", (req, res) => {
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


// Redirects stdin and out to stdout.log
// let access = fs.createWriteStream('./stdout.log', { flags: 'a'});
// process.stdout.write = process.stderr.write = access.write.bind(access);

// process.on('uncaughtException', function(err) {
// 	console.error((err && err.stack) ? err.stack : err);
// });


// Intents for Discord bot---
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
// module.exports = { moodleToken };
