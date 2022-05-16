const fetch = require ('node-fetch');

/**
 *
 * @param {string} token Moodle ws token
 * @param {string} day The day
 * @param {string} month The month
 * @param {string} year The year
 * @returns {array} Array of course id
 */
async function GetCourseIds (token, day, month, year) {
  let tempArr = [];
  if (day[0] == 0) day = day.substring (1);
  if (month[0] == 0) month = month.substring (1);
  const json = await fetch (
    'https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=' +
      token +
      '&wsfunction=core_calendar_get_calendar_day_view&day=' +
      day +
      '&year=' +
      year +
      '&month=' +
      month +
      '&moodlewsrestformat=json'
  ).then (req => req.json ());
  for (let i = 0; i < json.events.length; i++) {
    tempArr.push (json.events[i].course.id);
  }

  // return ListOfIds;
  return tempArr;
}
/**
 *
 * @param {string} id The Moodle course id
 * @param {string} token The Moodle ws token
 * @returns {object} JSON object containing course contents
 */
async function fetchData (id, token) {
  let json = await fetch (
    'https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=' +
      token +
      '&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=' +
      id +
      ''
  ).then (req => req.json ());
  return json;
}

/**
 *
 * @param {string} token The Moodle ws token
 * @param {string} Id The Moodle course
 * @returns {array} Array of objects containing name, courseid and timeStart
 */
async function courseModuleEvent (token, Id) {
  let eventsList = [];
  const json = await fetch (
    'https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=' +
      token +
      '&wsfunction=core_calendar_get_calendar_events&moodlewsrestformat=json&events[courseids][0]=' +
      Id +
      '&options[timeStart]=1640998800&options[timeend]=1656637200'
  ).then (req => req.json ());
  //Endnu et forloop her, iterere over json.events
  let summary = await fetchData (Id, token);
  let previousModule = 0;

  for (let j = 0; j < json.events.length; j++) {
    let obj =
      '{"courseName": "' +
      json.events[j].name +
      '", "courseId": "' +
      json.events[j].courseid +
      '", "timeUNIX": "' +
      json.events[j].timeStart;

    let date = new Date (json.events[j].timeStart * 1000);
    let year = date.getFullYear ();
    let month = date.getMonth ();
    let day = date.getDate ();
    let currentModule = day + ' ' + month + ' ' + year;

    if (j !== 0) {
      let date = new Date (json.events[j - 1].timeStart * 1000);
      let year = date.getFullYear ();
      let month = date.getMonth ();
      let day = date.getDate ();
      previousModule = day + ' ' + month + ' ' + year;
    }

    if (typeof summary[j] == 'undefined') {
      obj += '", "courseData": [' + '"N/A"' + ']}';
    } else if (
      previousModule !== currentModule &&
      summary[j + 1].summary !== false
    ) {
      obj +=
        '", "courseData": [' + JSON.stringify (summary[j + 1].summary) + ']}';
    } else if (summary[j].summary == false) {
      obj += '", "courseData": [' + '"N/A"' + ']}';
    } else {
      obj += '", "courseData": [' + JSON.stringify (summary[j].summary) + ']}';
    }
    eventsList.push (obj);
  }

  return eventsList;
}

/**
 *
 * @param {string} token The Moodle ws token
 * @param {string} day The day to be searched
 * @param {string} month The month to be searched
 * @param {string} year The year to be searched
 * @returns {array} Array with each index representing
 */
async function assembler (token, day, month, year) {
  let idList = await GetCourseIds (token, day, month, year);

  let uniqueIds = idList.filter ((v, i, a) => a.indexOf (v) === i);

  let data = '[';

  for (let i = 0; i < uniqueIds.length; i++) {
    let eventList = await courseModuleEvent (token, idList[i]);
    data += '{"events": [' + eventList + ']}';
    if (i !== uniqueIds.length - 1) {
      data += ',';
    }
  }

  data += ']';

  let rest = JSON.parse (data);
  return rest;
}

module.exports = {assembler};
