const { SlashCommandBuilder } = require("@discordjs/builders");
const { calendarDayView, getNextWday, datePToObj } = require("../../fetchCoursedata/calendarGetDayView.js");
const { fetchUser } = require("../../database/manageUserDB.js");
const { MessageEmbed } = require("discord.js");
const { format } = require('date-fns');

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
        let dateOBJ;
        let currentDate = fullDate();
        // TODO Ryd op
        // let user = fetchUser(interaction.user.id);
        // calendarDayView(user.moodle_token, currentDate.day, currentDate.month, currentDate.year);
        // const dinfar = CommandInteractionOptionResolver.getString("weekday");
        switch (interaction.options.data[0].value) {
            case "monday":
                dateOBJ = datePToObj(getNextWday('Monday'));
                // await interaction.editReply(calendarDayView(tis));
                break;
            case "tuesday":
                dateOBJ = datePToObj(getNextWday('Tuesday'));
                // await interaction.editReply('tuesday');
                break;
            case "wednesday":
                dateOBJ = datePToObj(getNextWday('Wednesday'));
                // await interaction.editReply('wednesday');
                break;
            case "thursday":
                dateOBJ = datePToObj(getNextWday('Thursday'));
                // await interaction.editReply('thursday');
                break;
            case "friday":
                dateOBJ = datePToObj(getNextWday('Friday'));
                // await interaction.editReply('friday');
                break;
            default:
                console.log(interaction.options.data[0].value);
                await interaction.editReply('please input a weekday');
                break;
        }
        console.log(dateOBJ);
        calendarDayView('c4043b1ff4ed72d98f8107586f61e4cb',dateOBJ.day,dateOBJ.month,dateOBJ.year)
        // .then(res => JSON.stringify(res))
        .then(async res => {
            // console.log(interaction.options.data[0].value);
            // console.log(JSON.stringify(res));
            let embedList = [];
            res.forEach((element, i) => {
                let embed = new MessageEmbed({
                    title: element.fullname,
                    url: element.url,
                    description: `${element.description} \n\t ${format(new Date(element.time.timestart)*1000,'Pp')} ${element.time.timeduration == 1 ? (element.time.timeduration) + 'hour' : (element.time.timeduration / 3600) + ' hours' } `
                    // timestamp: (element.time.timeduration /1000) + 'seconds'
                });
                embedList[i] = embed;
                console.log(`i=${i}`,embed);
            });
            console.log(embedList.length);
            // await interaction.editReply(`URL: ${res[0].url}`);
           await interaction.editReply({embeds: embedList});
        })
        .catch(err => console.error(err));
        // .then( async res => await interaction.editReply(res)); 
        // await interaction.editReply(calendar);
        }
    }

  // async execute(interaction) {
  //     await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  // },