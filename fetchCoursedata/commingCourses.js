const fs = require("fs");
const fetch = require("node-fetch");
const { default: axios } = require('axios');
const { connectDB } = require('../database/connectDB');
const { fetchUser } = require('../database/manageUserDB');
const {reader} = require('./printsortdata');
const {exportTest, input_reciver} = require('./discordBot/index')
let id_array = [];

connectDB();

async function commingCourses() {
    let profile = await fetchUser("321312543547064321");
                                    await axios.get("https://www.moodle.aau.dk/webservice/rest/server.php", {        
                                        params: {
                                            wstoken: profile.moodle_token,
                                            wsfunction: "core_calendar_get_calendar_upcoming_view",
                                            moodlewsrestformat: "json"       
                                        }
                                    }).then((res) => {
                                        for(let i in res.data.events){
                                        console.log(res.data.events[i].course.id)
                                        }
                                    }).catch((err) => {
                                        console.log(err);
                                    })
}

commingCourses();

async function fetch_data() {
    var options = "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" + moodle_token +  "&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=" + "41300";
    
    fetch(options)
      .then((Response) => {
        if (Response.ok) {
          return Response.text();
        } else {
          throw new Error(`fejl status ${response.status}`);
        }
      })
      .then((body) =>{
          for (let i in body.summary){
              console.log(body.summary[i])
          }
      });
  }

fetch_data();


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

module.exports = { commingCourses};