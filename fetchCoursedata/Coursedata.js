"use strict";
const fs = require("fs");
const fetch = require("node-fetch");
const my_json_file = require("./course_data1.json");




async function fetch_data() {
  var options = "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=fea55e838143611e65bdaef0a6c1e2b0&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=" + "41300";
  
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

fetch_data()