const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const { fetchUser } = require('../../database/manageUserDB');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('courses')
        .setDescription('Replies with courses'),
    async execute(interaction) {
        //Deferreply cause bot will take longer than 3 secs to respond
        interaction.deferReply();
        
        await fetchUser(interaction.user.id)
            .then(async (res) => {
                await axios.get("https://www.moodle.aau.dk/webservice/rest/server.php", {
                    params: {
                        wstoken: res.moodle_token,
                        wsfunction: "core_calendar_get_calendar_upcoming_view",
                        moodlewsrestformat: "json"
                    }
                }).then(async (res) => {
                    if (res.data.errorcode) {  //If moodle couldn't find any data related to the token
                        await interaction.editReply(res.data.message);
                    } else {
                        const message = new MessageEmbed({
                            title: "Comming courses:",
                            description: `Course: ${res.data.events[0].course.fullname}\nLocation: ${res.data.events[0].location}\nTime: ${timeConverter(res.data.events[0].timestart)}\nLink: ${res.data.events[0].course.viewurl}\n\nCourse: ${res.data.events[1].course.fullname}\nLocation: ${res.data.events[1].location}\nTime: ${timeConverter(res.data.events[1].timestart)}\nLink: ${res.data.events[1].course.viewurl}\n\nCourse: ${res.data.events[2].course.fullname}\nLocation: ${res.data.events[2].location}\nTime: ${timeConverter(res.data.events[2].timestart)}\nLink: ${res.data.events[2].course.viewurl}`
                        })
                        //Edit reply
                        await interaction.editReply({ embeds: [message] });
                    }
                });
            }).catch((async (err) => { //If no moodle token is set, it should reply
                console.log(err);
                await interaction.editReply("No moodle token found!");
            }));
    }
};

function timeConverter(UNIX_timestamp){
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
  let min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  let sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}