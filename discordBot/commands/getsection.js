const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { MessageEmbed } = require('discord.js');
const { fetchUser } = require('../../database/manageUserDB');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getsections')
        .setDescription('gets sections of next course'),
    async execute(interaction) {
        
        await fetchUser(interaction.user.id)
        .then(async (res) => {
            if (res) {
                //Deferreply cause bot will take longer than 3 secs to respond
                await interaction.deferReply();
                let moodletoken = res.moodle_token;
                await axios.get("https://www.moodle.aau.dk/webservice/rest/server.php", {    
                    params: {   
                        wstoken: moodletoken,
                        wsfunction: "core_calendar_get_calendar_upcoming_view",
                        moodlewsrestformat: "json"
                    }    
                }).then(async (res) => {
                    if (res.data.errorcode) {  //If moodle couldn't find any data related to the token    
                        await interaction.editReply(res.data.message);
                    } else {
                        await axios.get("https://www.moodle.aau.dk/webservice/rest/server.php", {    
                            params: {   
                                wstoken: moodletoken,
                                cmid: res.data.events[0].course.id,
                                wsfunction: "core_course_get_course_module",
                                moodlewsrestformat: "json"
                            }    
                        }).then(async (res) => {
                            if (res.data.errorcode) {  //If moodle couldn't find any data related to the token    
                                await interaction.editReply(res.data.message);
                            } else {
                                console.log(res);
                                //Edit reply to contain coursedata
                                await interaction.editReply("success");
                            }
                        });
                    }
                });
            } else {  //If no user is found in database
                await interaction.reply({ content: "No user found in database, you'll need to set your moodle token first, use: /setup" })
            }
        }).catch((async (err) => { 
            console.log(err);
            await interaction.reply({ content: "Error occured" });
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
  let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
  return time;
}