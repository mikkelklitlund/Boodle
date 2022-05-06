const fetch = require("node-fetch");
const { format, addDays } = require("date-fns");


const server = "https://www.moodle.aau.dk/webservice/rest/server.php?";
/**
 * @class
 * @classdesc Class representing a localized date 
 */
class localizeddate {
  /**
   * 
   * @param {string|number} day The day of the month 
   * @param {string|number} month The month of the year
   * @param {string|number} year The year
   */
  constructor(day,month,year) {
    this.day = day;
    this.month = month;
    this.year = year;
  }
};

/**
 * 
 * @param {string} target One of 5 work weekdays in date-fns EEEE format
 * @returns {string} The next instance of target weekday in date P format
 * @example
 * // returns The next occurrence of a monday (Including today, if it is a monday)
 * getNextWday('Monday')
 */
function getNextWday(target) {
  const today = new Date();
  // console.log(format(addDays(today,target),'EEEE'));
  let i = 0;
  while (1) {
    if (format(addDays(today, i), "EEEE") == target) {
      return format(addDays(today, i), "P");
    }
    i++;
    // console.log(i);
  }
}
/**
 * @function
 * @param {string} dateP The formatted date string, in date-fns P format
 * @returns {localizeddate} Object containing  day, month and year
 */
function datePToObj(dateP) {
  return new localizeddate(parseInt(dateP.substring(dateP.indexOf("/") + 1, dateP.lastIndexOf("/"))),
  parseInt(dateP.substring(0, dateP.indexOf("/")), 10),
  parseInt(
  dateP.substring(dateP.lastIndexOf("/") + 1, dateP.length)));
};
/** 
 * @description Filters unused data from response object 
 * @param {object} resOBJ
 * @returns {object} 
 */
function calendarDayViewOBJFilter(resOBJ) {
  let result = [];
  for (let i = 0; i < resOBJ.events.length; i++) {
    result[i] = {
      fullname: resOBJ.events[i].course.fullname,
      url: resOBJ.events[i].course.viewurl,
      id: resOBJ.events[i].id,
      instanceName: resOBJ.events[i].name,
      description: resOBJ.events[i].description,
      location: resOBJ.events[i].location,
      time: {
        timestart: resOBJ.events[i].timestart,
        timeduration: resOBJ.events[i].timeduration,
        timemodified: resOBJ.events[i].timemodified,
      },

    };
  }
  return result;
};
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
async function calendarDayView(moodleToken, day, month, year) {
  let requestURL = `${server}wstoken=${moodleToken}&wsfunction=core_calendar_get_calendar_day_view&day=${day}&month=${month}&year=${year}&moodlewsrestformat=json`;
  // let courseInfo;
  // Response obejct can be found at https://www.moodle.aau.dk/user/managetoken.php -> Moodle mobile web service documentation -> core_calendar_get_calendar_day_view
  console.log(requestURL);
  let data = await fetch(requestURL)
    .then(async (req) => await req.json())
    .then((json) => {
      //   delete json.filter_selector;
      //   delete json.events[0].course.viewurl;
      //   delete json.events[0].course.courseimage;
    //   console.log(json.events.length);
      //   console.log(json);
      // console.log(json.events[0])
    //   courseInfo = {
    //     id: json.events[0].id,
    //     instanceName: json.events[0].name,
    //     description: json.events[0].description,
    //     location: json.events[0].location,
    //     time: {
    //       timestart: json.events[0].timestart,
    //       timeduration: json.events[0].timeduration,
    //       timemodified: json.events[0].timemodified,
    //     },
    //     course: json.events[0].course,
    //   };
      // console.log(courseInfo);
      return calendarDayViewOBJFilter(json);
    })
    // .then(json => {return json})
    .catch((err) => console.log(err));
  return data;
}

// calendarDayView("c4043b1ff4ed72d98f8107586f61e4cb", 4, 5, 2022).then((res) =>
//   console.log(res[0])
// );
// console.log(getNextWday('Thursday'));
// console.log(datePToObj(getNextWday('Thursday')));
module.exports = { calendarDayView, getNextWday, datePToObj };
