const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setup")
		.setDescription("Generates and sends link to input Moodle token"),
	async execute(interaction) {
		// Converts user id to base64 for url generation
		await interaction.reply({
			content: `http://165.22.18.133/register/${Buffer.from(
				interaction.user.id,
				"ascii"
			).toString(
				"base64"
			)}/\nPlease follow the link and input your Moodle token`,
			ephemeral: true
		});
	}
};
