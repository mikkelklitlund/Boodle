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
                .addChoice('newcourses', 'newcourses')
                .addChoice('nextcourse', 'nextcourse')
                .addChoice('weekday', 'weekday')
                .addChoice('setup', 'setup')),
    async execute(interaction) {
        const message = new MessageEmbed({
            title: `/` + (interaction.options.getString("command")),
            description: ``
        })
        switch (interaction.options.getString("command")) {
            case "courses":
                message.description = "Usage: /courses\nDisplays the next 3 courses of the user";
                break;
            case "nextcourse":
                message.description = "Usage: /nextcourse\nDisplays the users next course";
                break;
            case "setup":
                message.description = "Usage: /setup\nStarts the process of setting up the users data in the database";
                break;
            case "Weekday":
                message.description = "Usage: /Weekday\nAllows the user to decide for which day they want the course material ";
                break;
            case "newcourses":
                message.description = "Usage: /newcourses\nAllows the user to decide how many courses they want to see.";
                break;
        }
        interaction.reply({ embeds: [message] });

    },
};