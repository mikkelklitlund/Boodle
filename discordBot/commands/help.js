const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('displays information about a command')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command you want help with')
                .setRequired(true)
                .addChoice('courses', 'courses')
                .addChoice('weekday', 'weekday')
                .addChoice('setup', 'setup')
                .addChoice('specificDate', 'show')),
    async execute(interaction) {
        const message = new MessageEmbed({
            title: `/` + (interaction.options.getString("command")),
            description: ``
        })
        switch (interaction.options.getString("command")) {
            case "setup":
                message.description = "Usage: /setup\nStarts the process of setting up the users data in the database.";
                break;
            case "courses":
                message.description = "Usage: /courses\nDisplays the next 3 courses of the user.";
                break;
            case "Weekday":
                message.description = "Usage: /weekday\nAllows the user to decide for which day they want the course material.";
                break;
            case "show":
                message.description = "Usage: /show\nAllows the user to get the course information for a specific date\n input date in format dd/mm/yyyy or dd-mm-yyyy.";
                break;
        }
        interaction.reply({ embeds: [message] });

    },
};