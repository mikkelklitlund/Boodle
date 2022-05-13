const getUnixTime = require("date-fns/getUnixTime");
/**
 *
 * @param {object} moduleList Object with every module in a given course
 * @param {string} stopDate Optional. To get a specific date (dd/mm/yyyy)
 * @returns {array} Array of numbers. One number per index for each course given in moduleList
 */
function syncModules(moduleList, stopDate) {
	let nextModules = [];
	let dateDifference = [];
	let n = 0; //n is used to increment array of date differences

	// Iterates over the length of the list (which is how many different courses on that day)
	for (let k = 0; k < moduleList.length; k++) {
		let count = 0;
		// Iterates over the length of each course
		for (let i = 1; i < moduleList[k].events.length; i++) {
			let date = new Date(moduleList[k].events[i - 1].timeUNIX * 1000);
			let year = date.getFullYear();
			let month = date.getMonth();
			let day = date.getDate();
			dateDifference[n] = day + " " + month + " " + year;
			n++;

			// If previous module and "current" module is NOT at the same date, as well as "current" module is not in the future
			// count will be incremented
			if (typeof stopDate == "undefined") {
				if (
					dateDifference[n - 1] !== dateDifference[n] &&
					parseInt(moduleList[k].events[i - 1].timeUNIX) <=
						Math.floor(Date.now() / 1000)
				) {
					count++;
				}
			} else {
				//If stopDate is passed along
				//stopDate has to follow dd/mm/yyyy or dd-mm-yyyy and be a string
				const day = stopDate.slice(0, 2);
				const month = stopDate.slice(3, 5);
				const year = stopDate.slice(6, 10);
				if (
					dateDifference[n - 1] !== dateDifference[n] &&
					parseInt(moduleList[k].events[i - 1].timeUNIX) <=
						dateToUnix(day, month, year)
				) {
					count++;
				}
			}
		}
		nextModules[k] = count;
	}
	return nextModules;
}

function dateToUnix(day, month, year) {
	return getUnixTime(new Date(year, month - 1, day, "00", "00"));
}

module.exports = { syncModules };
