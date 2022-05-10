/**
 *
 * @param {object} moduleList Object with every module in a given course
 * @returns Array of numbers. One number per index for each course given in moduleList
 */
function syncModules(moduleList) {
	let nextModules = [];
	let dateDifference = [];
	let n = 0; //n is used to increment array of date differences

	// Iterates over the length of the list (which is how many different courses on that day)
	for (let k = 0; k < moduleList.length; k++) {
		let count = 0;
		// Iterates over the length of each course
		for (let i = 1; i < moduleList[k].events.length; i++) {
			// Iterates 2 times ( i-1, i) to append the date of previous module and the "current" module to an array
			for (let j = i - 1; j < i + 1; j++) {
				let date = new Date(moduleList[k].events[j].timeUNIX * 1000);
				let year = date.getFullYear();
				let month = date.getMonth();
				let day = date.getDate();
				dateDifference[n] = day + " " + month + " " + year;
				n++;
			}

			// If previous module and "current" module is NOT at the same date, as well as "current" module is not in the future
			// count will be incremented
			if (
				dateDifference[n - 1] !== dateDifference[n] &&
				moduleList[k].events[i].timeUNIX <= Date.now()
			) {
				count++;
			}
		}
		nextModules[k] = count;
	}
	return nextModules;
}

module.exports = { syncModules };
