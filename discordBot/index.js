// Require packages needed
const fs = require("node:fs");
require('dotenv').config();
const { Client, Collection, Intents } = require("discord.js");
const https = require("https");
const express = require("express");
const path = require("path");
const req = require("express/lib/request");
const { fileURLToPath } = require("node:url");
const { request } = require("node:http");
const { json } = require("express/lib/response");
// Read key and certificate for HTTPS in testing environment
// TODO: get valid certificate
const key = fs.readFileSync("selfsigned.key");
const cert = fs.readFileSync("selfsigned.crt");
const options = {
  key: key,
  cert: cert,
};

// Arbitrary port, should be changed to 8443 
const port = 8443;
// Initialization of Express
const app = express();
// For making files accessible in directory
app.use('/public',express.static("../website"));

// Testing  
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../website/Public_resources/setup/index.html"));
});
app.post("/", (req, res) => {
  let body = '';
  filePath = __dirname + '/data.txt';
  req.on('data', data =>{
    body += data;
  });

  req.on('end',()=>{
    // body = JSON.parse(body);
    console.log(body + '\n' +filePath);
    fs.appendFile(filePath, body, ()=>{
      res.end();
    });
  });
  res.send("POST tis test");
  console.log('post');
});

app.get("/register/:id", (req, res) => {
  res.send('Discord id: ' + Buffer.from(req.params.id,'base64').toString('utf8'));
});

/* // Sends BoodleHjemmeside.html on accessing localhost:4000/Boodle
app.get("/Boodle", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/BoodleHjemmeside.html"));
}); */

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
// console.log(Buffer.from('din mor').toString('base64')); // din mor -> ZGluIG1vcg== 
// console.log(Buffer.from('ZGluIG1vcg==','base64').toString('utf8')); // ZGluIG1vcg== -> din mor