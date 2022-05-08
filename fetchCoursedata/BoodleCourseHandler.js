const { connectDB } = require("../database/connectDB");
const { fetchUser } = require("../database/manageUserDB");
const fetch = require("node-fetch");
const { da } = require("date-fns/locale");

// let ListOfIds = [];
let day = "";
let month = "";
let year = "";

async function GetCourseIds(token, day, month, year) {
	let tempArr = [];
	const json = await fetch(
		"https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" +
			token +
			"&wsfunction=core_calendar_get_calendar_day_view&day=" +
			day +
			"&year=" +
			year +
			"&month=" +
			month +
			"&moodlewsrestformat=json"
	).then((req) => req.json());
	for (let i = 0; i < json.events.length; i++) {
		tempArr.push(json.events[i].course.id);
	}

	// return ListOfIds;
	return tempArr;
}

async function fetch_data(id, token) {
	let json = await fetch(
		"https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" +
			token +
			"&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=" +
			id +
			""
	).then((req) => req.json());
	return json;
}

async function course_module_event(token, ListOfIds) {
	let eventsList = [];
	for (let i = 0; i < ListOfIds.length; i++) {
		const json = await fetch(
			"https://www.moodle.aau.dk/webservice/rest/server.php?wstoken=" +
				token +
				"&wsfunction=core_calendar_get_calendar_events&moodlewsrestformat=json&events[courseids][0]=" +
				ListOfIds[i] +
				"&options[timestart]=1640998800&options[timeend]=1656637200"
		).then((req) => req.json());
		//Endnu et forloop her, iterere over json.events
		let summary = await fetch_data(json.events[i].courseid, token);

		for (let j = 0; j < json.events.length; j++) {
			let obj =
				'{"courseName": "' +
				json.events[j].name +
				'", "courseId": "' +
				json.events[j].courseid +
				'", "timeUNIX": "' +
				json.events[j].timestart;

			let date = new Date(json.events[j].timestart * 1000);
			let year = date.getFullYear();
			let month = date.getMonth();
			let day = date.getDate();
			let currentModule = day + " " + month + " " + year;

			let previousModule = 0;

			if (j !== 0) {
				let date = new Date(json.events[j - 1].timestart * 1000);
				let year = date.getFullYear();
				let month = date.getMonth();
				let day = date.getDate();
				previousModule = day + " " + month + " " + year;
			}

			if (
				previousModule !== currentModule &&
				summary[j + 1].summary !== false
			) {
				obj +=
					'", "courseData": [' + JSON.stringify(summary[j + 1].summary) + "]}";
			} else if (
				previousModule !== currentModule &&
				summary[j + 1].summary === false
			) {
				obj += '", "courseData": [' + "N/A" + "]}";
			} else {
				obj += '", "courseData": [' + JSON.stringify(summary[j].summary) + "]}";
			}
			eventsList.push(obj);
		}
	}
	return eventsList;
}

async function assembler(token, day, month, year) {
	let idList = await GetCourseIds(token, day, month, year);
	let eventsList = await course_module_event(token, idList);
	let data = '{"events": [' + eventsList + "]}";

	let rest = JSON.parse(data);
	return rest;
}

module.exports = { assembler };
