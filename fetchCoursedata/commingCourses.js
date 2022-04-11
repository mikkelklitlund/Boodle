const fs = require("fs");
const fetch = require("node-fetch");
const { default: axios } = require('axios');
const { connectDB } = require('../database/connectDB');
const { fetchUser } = require('../database/manageUserDB');
//const {moodle_token} = require('')
let id_array = [];
let course_number = [];

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
                                          id_array[i] = res.data.events[i].course.id
                                          course_number[i] = res.data.events[i].course
                                          fetch_data(id_array[i])
                                        console.log(res.data.events[i].course.id)
                                        }
                                    }).catch((err) => {
                                        console.log(err);
                                    })
}

commingCourses();

const moodle_token = "fea55e838143611e65bdaef0a6c1e2b0"

async function fetch_data(id_array) {
    var options = "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" + moodle_token +  "&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=" + id_array;
    
    fetch(options)
      .then((Response) => {
        if (Response.ok) {
          return Response.text();
        } else {
          throw new Error(`fejl status ${response.status}`);
        }
      })
      .then((body) => fs.writeFileSync("course_data1.json", body));
      reader();
  }



function reader(){
  const my_json_file = require("./course_data1.json") 
  
   for (let i = 1; i < my_json_file.length; i++){
       console.log(my_json_file[i].summary);
   }
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

module.exports = { commingCourses};