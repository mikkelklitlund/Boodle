"use strict"

import fs from "fs";
import fetch from "node-fetch"

const options =
  "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=fea55e838143611e65bdaef0a6c1e2b0&wsfunction=core_course_get_contents&courseid=41300&moodlewsrestformat=xml";

async function fetch_data(){
    fetch(options)
    .then(Response => {
        if (Response.ok){
            return Response.text();
        } else {throw new Error(`fejl status ${response.status}`);
    }})
    .then(body => fs.writeFileSync("course_data1.json", JSON.stringify(body, null, "\t")));
    };
fetch_data()
