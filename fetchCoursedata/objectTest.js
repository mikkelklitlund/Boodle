const fetch = require("node-fetch");
const moodle_token = "fea55e838143611e65bdaef0a6c1e2b0";
let events = [];


//for (let i = 0; i < 10; i++) {
  //  let obj = '{"courseName": "'+ i +'", "courseId": '+i+', "courseData": [{"summary": ""}]}'
    //events.push(obj)
//}
 
//let result = '{"events": ['+events+']}';

//let object = JSON.parse(result);


 
async function course_module_event(moodle_token,id,A) {
    //core data, that is needed to get data from the API.
    // sends request to the assembled url, and retrive a response in format JSON
    await fetch("https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" +
    moodle_token +
    "&wsfunction=core_calendar_get_calendar_events&moodlewsrestformat=json&events[courseids][0]=" +
    41300 +
    "&options[timestart]=1640998800&options[timeend]=1656637200")
      .then((req) => req.json())
      .then((json) => {
        //collecting data from the response, saved into a JSON object.
      for(let i = 0; i < json.events.length; i++){ 
          console.log(json.events[i].name)
        }
      });
    }
  
course_module_event(moodle_token)