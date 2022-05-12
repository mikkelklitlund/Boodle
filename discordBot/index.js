// Discord modules
require("dotenv").config({ path: "../.env" });
const fs = require("node:fs");
const { Client, Collection, Intents } = require("discord.js");

//Setting up express
require("./server");

// DB related modules
const { connectDB } = require("../database/connectDB");

// Creates connection to database
connectDB();

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
	}
});

client.login(process.env.BOT_TOKEN);
