const fetch = require("node-fetch");
const { format, addDays } = require("date-fns");
const res = require("express/lib/response");

// Weekdays in EEEE format
const weekday = [
  "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday",
];
const server = "https://www.moodle.aau.dk/webservice/rest/server.php?";

// console.log(new Date("2022,2,31"));

// target wday in EEEE format
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
function datePToObj(dateP) {
  return {
    day: parseInt(
      dateP.substring(dateP.indexOf("/") + 1, dateP.lastIndexOf("/")),
      10
    ),
    month: parseInt(dateP.substring(0, dateP.indexOf("/")), 10),
    year: parseInt(
      dateP.substring(dateP.lastIndexOf("/") + 1, dateP.length),
      10
    ),
  };
}

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
}

// fx year=2022, month=4, day=26
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
