const { connectDB } = require('../database/connectDB');
const { fetchUser } = require('../database/manageUserDB');
const { jar } = require("request");
const { profile } = require("console");
const { error } = require("console");
const { response } = require("express");
const res = require("express/lib/response");
const fs = require("fs");
const fetch = require("node-fetch");
const moodle_token = "fea55e838143611e65bdaef0a6c1e2b0";

connectDB();
let id = new Array;
let timeStart = new Array;
let courseName = new Array;
let summary = new Array;


async function calenderView(id) {
  const url2 = "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=fea55e838143611e65bdaef0a6c1e2b0&wsfunction=core_calendar_get_calendar_day_view&day=3&year=2022&month=5&moodlewsrestformat=json";
  const URL = "https://www.moodle.aau.dk/webservice/rest/server.php?";

   fetch(url2)
    .then((request) => request.json())
    .then((json) => {
     
      for (let i = 0; i < json.events.length; i++) {
       //id[i] = json.events[i].course.id;
       id[i] = json.events[i].course.id
       console.log(id[i])
    }
      
      return id;
    });
    assembler(moodle_token, id, timeStart, courseName, summary);
}

async function course_module_event(moodle_token,id,A) {
  //core data, that is needed to get data from the API.
  // sends request to the assembled url, and retrive a response in format JSON
  await fetch("https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" +
  moodle_token +
  "&wsfunction=core_calendar_get_calendar_events&moodlewsrestformat=json&events[courseids][0]=" +
  id +
  "&options[timestart]=1640998800&options[timeend]=1656637200")
    .then((req) => req.json())
    .then((json) => {
      //collecting data from the response, saved into a JSON object.
    for(let j = 0; j < json.events.length; j++){ 
        let obj = '{"courseName": "'+json.events[j].name+'", "courseId": "'+json.events[j].courseid+'", "timeUNIX": "'+json.events[j].timestart+'", "courseData": [{"summary": ""}]}';
        A.push(obj);
      }
    });
  
}

async function assembler(moodle_token, id,timeStart,A, courseName, summary) {

  

  
  
  //await course_module_event(moodle_token, id[1], A, timeStart, courseName);
  
  let data = '{"events": ['+A+']}';
  let result = JSON.parse(data)

  //console.log(result)


  //let obj = '{"courseName": "'+json.events[i].name+'", "courseId": "'+json.events[i].courseid+'", "timeUNIX": "'+json.events[i].timestart+'", "courseData": [{"summary": "'/indsæt/'"}]}'
 // events.push(obj);
 // console.log(JSON.parse(result));
}
await calenderView(moodle_token, id);

