const fetch = require ('node-fetch');
const {format, addDays} = require ('date-fns');

const server = 'https://www.moodle.aau.dk/webservice/rest/server.php?';
/**
 * @class
 * @classdesc Class representing a localized date
 */
class localizedDate {
  /**
	 *
	 * @param {string|number} day The day of the month
	 * @param {string|number} month The month of the year
	 * @param {string|number} year The year
	 */
  constructor (day, month, year) {
    this.day = day;
    this.month = month;
    this.year = year;
  }
}

/**
 *
 * @param {string} target One of 5 work weekdays in date-fns EEEE format
 * @returns {string} The next instance of target weekday in date P format
 * @example
 * // returns The next occurrence of a monday (Including today, if it is a monday)
 * getNextWday('Monday')
 */
function getNextWday (target) {
  const today = new Date ();
  // console.log(format(addDays(today,target),'EEEE'));
  let i = 0;
  while (1) {
    if (format (addDays (today, i), 'EEEE') == target) {
      return format (addDays (today, i), 'P');
    }
    i++;
  }
}

/**
 * @param {string} dateP The formatted date string, in date-fns P format
 * @returns {localizedDate} Object containing  day, month and year
 */
function datePToObj (dateP) {
  return new localizedDate (
    parseInt (
      dateP.substring (dateP.indexOf ('/') + 1, dateP.lastIndexOf ('/'))
    ),
    parseInt (dateP.substring (0, dateP.indexOf ('/')), 10),
    parseInt (dateP.substring (dateP.lastIndexOf ('/') + 1, dateP.length))
  );
}

/**
 * @description Filters unused data from response object
 * @param {object} resOBJ
 * @returns {object}
 */
function calendarDayViewOBJFilter (resOBJ) {
  let result = [];
  for (let i = 0; i < resOBJ.events.length; i++) {
    result[i] = {
      fullName: resOBJ.events[i].course.fullName,
      url: resOBJ.events[i].course.viewURL,
      id: resOBJ.events[i].id,
      instanceName: resOBJ.events[i].name,
      description: resOBJ.events[i].description,
      location: resOBJ.events[i].location,
      time: {
        timeStart: resOBJ.events[i].timeStart,
        timeDuration: resOBJ.events[i].timeDuration,
        timeModified: resOBJ.events[i].timeModified,
      },
    };
  }
  return result;
}

/**
 *
 * @param {(string | number)} moodleToken The moodle ws token
 * @param {string | number} day The day to be searched for
 * @param {string | number} month The month to be searched for
 * @param {string | number} year the month to be searched for
 * @returns {object} Day view array of objects
 * @example
 * //returns view for 20/4/2022
 * calendarDayView('123',20,4,2022)
 */
async function calendarDayView (moodleToken, day, month, year) {
  if (day[0] == 0) day = day.substring (1);
  if (month[0] == 0) month = month.substring (1);
  let requestURL = `${server}wstoken=${moodleToken}&wsfunction=core_calendar_get_calendar_day_view&day=${day}&month=${month}&year=${year}&moodlewsrestformat=json`;
  // Response obejct can be found at https://www.moodle.aau.dk/user/managetoken.php -> Moodle mobile web service documentation -> core_calendar_get_calendar_day_view
  // console.log(requestURL);
  let data = await fetch (requestURL)
    .then (async req => await req.json ())
    .then (json => {
      return calendarDayViewOBJFilter (json);
    })
    .catch (err => console.log (err));
  return data;
}

module.exports = {calendarDayView, getNextWday, datePToObj};
