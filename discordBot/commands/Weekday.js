const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, CommandInteractionOptionResolver } = require("discord.js");
const {calendarDayView} = require("../../fetchCoursedata/calendarGetDayView.js");
const {fetchUser} = require("../../database/manageUserDB.js");

function fullDate() {
    const weekday = ["Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday"];
    const d = new Date();
    let wday = weekday[d.getDay()];
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();

    return {
        wday: wday,
        day: day,
        month: month,
        year: year
    };
  };

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
        await interaction.deferReply();
        let currentDate = fullDate();
        let user = fetchUser(interaction.user.id);
        calendarDayView(user.moodle_token, currentDate.day, currentDate.month, currentDate.year);
        // const dinfar = CommandInteractionOptionResolver.getString("weekday");
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