"use strict";

import fs, { symlink } from "fs";
import fetch from "node-fetch";
import { createRequire } from "module"; 
const require = createRequire(import.meta.url);
const my_json_file = require("./course_data1.json") 


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

function reader(){
  
  for (let i = 1; i < my_json_file.length; i++){
      console.log(my_json_file[i].summary);
  }
}
reader()


//async function course_data(){
  //  let json = fs.readFileSync('course_data1.json');
    //const parsedData = JSON.parse(json);
    //console.log(parsedData);

//}
//course_data();



