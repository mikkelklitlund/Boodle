const fs = require("fs");
const fetch = require("node-fetch");
const moodle_token = "fea55e838143611e65bdaef0a6c1e2b0"

async function fetch_data() {
    var options = "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" + moodle_token +  "&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=" + "41300";
    
    fetch(options)
      .then((Response) => {
        if (Response.ok) {
          return Response.text();
        } else {
          throw new Error(`fejl status ${response.status}`);
        }
      })
      .then((body) =>{
              console.log(body)
      });
  }
  fetch_data()