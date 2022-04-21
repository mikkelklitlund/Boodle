const fs = require("fs");
const fetch = require("node-fetch");
const { default: axios } = require('axios');
const { connectDB } = require('../database/connectDB');
const { fetchUser } = require('../database/manageUserDB');
const { jar } = require("request");
const { profile } = require("console");
let id_array = [];
let course_number = [];
let course = {Event:[
  {    
  courseName: [],
  
  course_date_unix: [],
  course_date: [],
  summarys: [],
  location: [],
  course_links: []
  }
]};
let k = 0;
connectDB();

async function commingCourses(k) {
    let profile = await fetchUser("321312543547064321");
                                    await axios.get("https://www.moodle.aau.dk/webservice/rest/server.php", {        
                                        params: {
                                            wstoken: "fea55e838143611e65bdaef0a6c1e2b0",
                                            wsfunction: "core_calendar_get_calendar_upcoming_view",
                                            moodlewsrestformat: "json"       
                                        }
                                    }).then((res) => {
                                        for(let i in res.data.events){
                                          id_array[i] = res.data.events[i].course.id
                                          course_number[i] = res.data.events[i].course
                                          fetch_data(id_array[i])
                                          k = k + 1;
                                        console.log(id_array[i])
                                        }
                                    }).catch((err) => {
                                        console.log(err);
                                    })
}

commingCourses();

const token = "fea55e838143611e65bdaef0a6c1e2b0"

async function fetch_data(id_array, token) {
    var options = "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" + token +  "&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=" + id_array;
    
    fetch(options)
    .then(req => req.json())
    .then(json => {
      for (let i in json){
       console.log(json[i].summary)

      }
    }
    )
  }


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

module.exports = {commingCourses};