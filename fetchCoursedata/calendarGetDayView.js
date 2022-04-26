const fetch = require('node-fetch');
const { format } = require('date-fns');

const server = 'https://www.moodle.aau.dk/webservice/rest/server.php?';

format(new Date(2022,4,26), 'yyyy-MM--dd');

console.log(new Date("2022,2,31"));

// fx year=2022, month=4, day=26
async function calendarDayView(moodleToken, day, month, year) {
    let requestURL = `${server}wstoken=${moodleToken}&wsfunction=core_calendar_get_calendar_day_view&day=${day}&month=${month}&year=${year}&moodlewsrestformat=json`
    let courseInfo;
    fetch(requestURL)
      .then((req) => req.json())
      .then(json => {
          delete json.filter_selector;
          delete json.events[0].course.viewurl;
          delete json.events[0].course.courseimage;
        //   console.log(json);
        courseInfo = {
            id: json.events[0].id,
            instanceName: json.events[0].name,
            description: json.events[0].description,
            location: json.events[0].location,
            time: {
                timestart: json.events[0].timestart,
                timeduration: json.events[0].timeduration,
                timemodified: json.events[0].timemodified
              },
              course: json.events[0].course
          };
          console.log(courseInfo);
        })
        // .then(json => console.log(courseInfo))
      .catch((err) => console.log(err));

};

// calendarDayView('c4043b1ff4ed72d98f8107586f61e4cb',26,4,2022);

module.exports = { calendarDayView }