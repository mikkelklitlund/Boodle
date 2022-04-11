const { response } = require("express");
const fs = require("fs");
const fetch = require("node-fetch");
const moodle_token = "fea55e838143611e65bdaef0a6c1e2b0"

var course = {
    courseName: [],
    course_date_unix: [],
    course_date: [],
    summary: [],
    location: [],
    course_links: []
}

var url = 'https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=fea55e838143611e65bdaef0a6c1e2b0&wsfunction=core_calendar_get_calendar_events&moodlewsrestformat=json&events[courseids][0]=41300&options[timestart]=1640998800&options[timeend]=1656637200'

async function course_module_event(){
    fetch(url)
    .then((req) => {
        if (req.ok) {
            return req.text()
        } else {
            throw new Error(`fejl status ${req.status}`);
        }
    })
    .then((res) => { 
    for(let i in res.data.events){
        course_date[i] = 
    }
    });
}
course_module_event();