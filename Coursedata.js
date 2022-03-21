"use strict";

import fs from "fs";
import fetch from "node-fetch";

const options =
  "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=fea55e838143611e65bdaef0a6c1e2b0&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=41300";

async function fetch_data() {
  fetch(options)
    .then((Response) => {
      if (Response.ok) {
        return Response.text();
      } else {
        throw new Error(`fejl status ${response.status}`);
      }
    })
    .then((body) => fs.writeFileSync("course_data1.json", body));
}
fetch_data();

function json(){
    let course_data = fs.readFileSync('course_data1.json');
    const parsedData = JSON.parse(course_data);
    console.log(parsedData);
}

json()
