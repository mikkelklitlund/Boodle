// Require packages needed
const fs = require("node:fs");
require('dotenv').config();
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");
const https = require("https");
const express = require("express");
const path = require("path");
// Read key and certificate for HTTPS in testing environment
// TODO: get valid certificate
const key = fs.readFileSync("selfsigned.key");
const cert = fs.readFileSync("selfsigned.crt");
const options = {
  key: key,
  cert: cert,
};

// Arbitrary port, should be changed to 8443 
const port = 4000;
// Initialization of Express
const app = express();
// For making files accessible in directory
app.use(express.static("../html"));

// Testing
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Sends BoodleHjemmeside.html on accessing localhost:4000/Boodle
app.get("/Boodle", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/BoodleHjemmeside.html"));
});

// Creates HTTPS server
const server = https.createServer(options, app).listen(port, () => {
  console.log(`Server Running at https://localhost:${port}`);
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
