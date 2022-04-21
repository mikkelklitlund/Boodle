const { response } = require("express");
const fs = require("fs");
const fetch = require("node-fetch");

const courseid = "41259";
const moodle_token = "fea55e838143611e65bdaef0a6c1e2b0";

let course = {
  Event: [
    {
      courseName: [],
      course_description: [],
      course_date_unix: [],
      course_date: [],
      summary: [],
      location: [],
      course_links: [],
    },
  ],
};

async function course_module_event(moodle_token, courseid) {
  var url =
    "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" +
    moodle_token +
    "&wsfunction=core_calendar_get_calendar_events&moodlewsrestformat=json&events[courseids][0]=" +
    courseid +
    "&options[timestart]=1640998800&options[timeend]=1656637200";

  fetch(url)
    .then((req) => req.json())
    .then((json) => {
      for (let i in json.events) {
        course.Event[0].course_date_unix[i] = json.events[i].timestart;
        course.Event[0].course_description[i] = json.events[i].name;

        console.log(course.Event[0].course_date_unix[i]);
      }
    });
}

async function fetch_data(moodle_token, courseid) {
  var options =
    "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" +
    moodle_token +
    "&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=" +
    courseid;

  fetch(options)
    .then((req) => req.json())
    .then((json) => {
      if (Number(json[2].id) < Number(json[3].id)) {
        for (let i in json) {
          course.Event[0].summary[i] = json[i].summary;
        }
      }else if (Number(json[2].id > Number(json[3].id))){
          for (let j = json.length; j > 0; j--){
              course.Event[0].summary[j] = json[j].summary
          }
      }
      console.log("a");
    });
}

course_module_event(moodle_token, courseid);
fetch_data(moodle_token, courseid);
