const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const https = require('https');
const express = require('express');
const path = require('path');

const key = fs.readFileSync('selfsigned.key');
const cert = fs.readFileSync('selfsigned.crt');
const options = {
	key: key,
	cert: cert
};

const port = 4000;
const app = express();
app.use(express.static('../html'));
app.get('/',(req,res)=> {
	res.send('Hello world');
});
app.get('/Boodle',(req,res)=> {
	res.sendFile(path.join(__dirname,'../html/BoodleHjemmeside.html'));
});


const server = https.createServer(options,app)
	.listen(port, ()=> {
		console.log(`Server Running at https://localhost:${port}`);
		console.log(__dirname);
	});


// Redirects stdin and out to stdout.log
// let access = fs.createWriteStream('./stdout.log', { flags: 'a'});
// process.stdout.write = process.stderr.write = access.write.bind(access);

// process.on('uncaughtException', function(err) {
// 	console.error((err && err.stack) ? err.stack : err);
// });

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);