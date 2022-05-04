async function fetch_data(moodle_token, id, summary) {
    //core data; assembled url.
    for (let i = 0; i < id.length; i++){ 
    var options =
      "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" +
      moodle_token +
      "&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=" +
      id[i];
  
    fetch(options)
      .then((req) => req.json())
      .then((json) => {
       
      });
    }
  }
  async function course_module_event(moodle_token,id, timeStart, courseName) {
    //core data, that is needed to get data from the API.
    for (let i = 0; i < id.length; i++){ 
    var url =
      "https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" +
      moodle_token +
      "&wsfunction=core_calendar_get_calendar_events&moodlewsrestformat=json&events[courseids][0]=" +
      id[i] +
      "&options[timestart]=1640998800&options[timeend]=1656637200";
    // sends request to the assembled url, and retrive a response in format JSON
    fetch(url)
      .then((req) => req.json())
      .then((json) => {
        //collecting data from the response, saved into a JSON object.
        for (let j = 0; j < json.events.length; j++) {
          courseName[i][j] = json.events[j].name;
          timeStart[i][j] = json.events[j].timeStart;
        }
      });
    }
  }
  