const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, CommandInteractionOptionResolver } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
    .setName("weekday")
    .setDescription("Prints schedule for a given weekday")
    .addStringOption((option) =>
    option.setName("weekday")
    .setDescription("Prints schedule for next monday.")
    .setRequired(true)
    .addChoice("monday", "monday")
    .addChoice("tuesday", "tuesday")
    .addChoice("wednesday", "wednesday")
    .addChoice("thursday", "thursday")
    .addChoice("friday", "friday")),
    
    async execute(interaction) {
        // const dinfar = CommandInteractionOptionResolver.getString("weekday");
        await interaction.deferReply();
        switch (interaction.options.data[0].value) {
            case "monday":
                await interaction.editReply('monday');
                break;
            case "tuesday":
                await interaction.editReply('tuesday');
                break;
            case "wednesday":
                await interaction.editReply('wednesday');
                break;
            case "thursday":
                await interaction.editReply('thursday');
                break;
            case "friday":
                await interaction.editReply('friday');
                break;
            default:
                console.log(interaction.options.data[0].value);
                await interaction.editReply('please input a weekday');
                break;
        } 
        }
    }

  // async execute(interaction) {
  //     await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  // },
