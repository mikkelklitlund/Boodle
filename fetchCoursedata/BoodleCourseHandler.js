const { connectDB } = require("../database/connectDB");
const { fetchUser } = require("../database/manageUserDB");
const fetch = require("node-fetch");
const { da } = require("date-fns/locale");

// let ListOfIds = [];
let day = "";
let month = "";
let year = "";

async function GetCourseIds(token, day, month, year) {
  let tempArr = [];
	const json = await fetch(
    "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" +
    token +
    "&wsfunction=core_calendar_get_calendar_day_view&day=" +
    day +
    "&year=" +
    year +
    "&month=" +
    month +
    "&moodlewsrestformat=json"
    ).then((req) => req.json());
    for (let i = 0; i < json.events.length; i++) {
      tempArr.push(json.events[i].course.id);
    }
    
    // return ListOfIds;
    return tempArr;
  }
  
  async function fetch_data(id, counter, token) {
    let json = await fetch(
      "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" +
			token +
			"&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=" +
			id +
			""
      ).then((req) => req.json());
      return JSON.stringify(json[counter].summary);
    }
    
    async function course_module_event(token,ListOfIds) {
      let eventsList = [];
      let idList = [];
      for (let i = 0; i < ListOfIds.length; i++) {
        const json = await fetch(
          "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" +
          token +
          "&wsfunction=core_calendar_get_calendar_events&moodlewsrestformat=json&events[courseids][0]=" +
          ListOfIds[i] +
          "&options[timestart]=1640998800&options[timeend]=1656637200"
          ).then((req) => req.json());
          let obj =
          '{"courseName": "' +
          json.events[i].name +
          '", "courseId": "' +
          json.events[i].courseid +
          '", "timeUNIX": "' +
          json.events[i].timestart +
          '", "courseData": [' +
          (await fetch_data(json.events[i].courseid, i + 1, token)) +
          "]}";
          eventsList.push(obj);
        }
        return eventsList;
      }
async function assembler(token, day, month, year) {
	let idList = await GetCourseIds(token, day, month, year)
	let eventsList = await course_module_event(token, idList);
	let data = '{"events": [' + eventsList + "]}";

	let rest = JSON.parse(data);
	return rest;
}


module.exports = { assembler };

