const { default: axios } = require('axios');

async function commingCourses() {
    let profile = await axios.get('http://localhost:3000/users/fetchUser/' + "321312543547064321")
                                .then(async (res) => {
                                    await axios.get("https://www.moodle.aau.dk/webservice/rest/server.php", {        
                                        params: {
                                            wstoken: res.data.moodle_token,
                                            wsfunction: "core_calendar_get_calendar_upcoming_view",
                                            moodlewsrestformat: "json"       
                                        }
                                    }).then((res) => {
                                        console.log(res.data.events[0].course.id)
                                    }).catch((err) => {
                                        console.log(err);
                                    })
                                });
}

commingCourses();

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

module.exports = { commingCourses };