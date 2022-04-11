module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('\x1b[32m%s\x1b[0m',`Ready! Logged in as ${client.user.tag}`);
	},
};