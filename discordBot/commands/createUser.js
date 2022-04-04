const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Generates and sends link to input Moodle token'),
    async execute(interaction) {
        // Converts user id to base64 for url generation
        await interaction.reply(`https://localhost:8443/register/${Buffer.from(interaction.user.id).toString('base64')} \n Please follow the link and input your Moodle token`);
    },
};