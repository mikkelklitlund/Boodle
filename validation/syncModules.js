function syncModules(moduleList) {
	let count = 0;
	let dateDifference = [];
	let k = 0;

	// for each new day (based on unix time) count ++ up till next course
	for (let i = 1; i < moduleList.events.length; i++) {
		for (let j = i - 1; j < i + 1; j++) {
			let date = new Date(moduleList.events[j].timeUNIX * 1000);
			let year = date.getFullYear();
			let month = date.getMonth();
			let day = date.getDate();
			dateDifference[k] = day + " " + month + " " + year;
			k++;
		}

		if (
			dateDifference[k - 1] !== dateDifference[k] &&
			moduleList.events[i].timeUNIX <= Date.now()
		) {
			count++;
		} //unix day is different from previous count++
	}
	return count;
}

module.exports = { syncModules };
