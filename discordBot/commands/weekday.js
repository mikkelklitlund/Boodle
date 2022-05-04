const { SlashCommandBuilder } = require("@discordjs/builders");
const { calendarDayView, getNextWday, datePToObj } = require("../../fetchCoursedata/calendarGetDayView.js");
const { fetchUser } = require("../../database/manageUserDB.js");
const { MessageEmbed } = require("discord.js");
const { format } = require('date-fns');

/**
 * Fields for MessageEmbed class

 * @param {string} title The title or name of the Moodle event
 * @param {string} description The description of Moodle event 
 * @param {string} location The location of the Moodle event
 * @param {object} time The timestart and timeduratino of the Moodle event
 * @param {string} courseName The coursename of the Moodle event
 * @param {string} url The url of the Moodle event
 * @param {string} summary The summary of the Moodle event
 */
class customEmbedField {
    // called when making new instance of customEmbedField (e.g new customEmbedField(...))
    constructor(title, description, location,time,courseName, url, summary){
        this.title = title || 'Title'
        this.description = description || 'No description available';
        this.time = time || {timestart: 0, timeduration: 1};
        this.courseName = courseName || 'Course';
        this.url = url || '';
        this.location = location || '';
        this.summary = summary || 'N/A'
    };
    // Method that generates array of objects using this instance values
    
    fieldEmbedifier() {
        return [
            {
                name: this.courseName,
                value: this.title,
                inline: false
            },
            {
                name: 'Location',
                value: this.location,
                inline: true
            },
            {
                name: 'Date',
                value: `${format(new Date(this.time.timestart)*1000,'Pp')} ${this.time.timeduration === 1 ? (this.time.timeduration) + 'hour' : (this.time.timeduration / 3600) + ' hours' }`,
                inline: true
            },
            {
                name: 'Description',
                value: this.description + `\n${this.url}`,
                inline: false
            },
            {
                name: 'Summary',
                value: this.summary,
                inline:false
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false
            }
        ];
    }
};
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
        // let currentDate = fullDate();
        // TODO Ryd op
        // let user = fetchUser(interaction.user.id);
        // calendarDayView(user.moodle_token, currentDate.day, currentDate.month, currentDate.year);
        // const dinfar = CommandInteractionOptionResolver.getString("weekday");
        switch (interaction.options.data[0].value) {
            case "monday":
                dateOBJ = datePToObj(getNextWday('Monday'));
                break;
            case "tuesday":
                dateOBJ = datePToObj(getNextWday('Tuesday'));
                break;
            case "wednesday":
                dateOBJ = datePToObj(getNextWday('Wednesday'));
                break;
            case "thursday":
                dateOBJ = datePToObj(getNextWday('Thursday'));
                break;
            case "friday":
                dateOBJ = datePToObj(getNextWday('Friday'));
                break;
            default:
                await interaction.editReply('please input a weekday');
                break;
        }
        fetchUser(interaction.user.id).then(res => {
            calendarDayView(res.moodle_token,dateOBJ.day,dateOBJ.month,dateOBJ.year)
        })
        .then(async res => {
            let bigField =[];
            res.forEach((element,i) => {
                let field = new customEmbedField(element.instanceName, element.description, element.location,element.time,element.fullname,element.url).fieldEmbedifier();
                let tempArr = [];
                tempArr[i] = field;
                bigField = bigField.concat(tempArr[i]);
            });
            bigField = bigField.pop();
            let bigEmbed = new MessageEmbed({
                title: res.length === 1 ? 'Course' : 'Courses',
                url: 'https://moodle.aau.dk/my/',
                fields: bigField,
            })
           await interaction.editReply({embeds: [bigEmbed]});
        })
        .catch(err => console.error(err));
        }
    }
