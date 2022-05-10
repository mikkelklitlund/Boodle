function syncModules(moduleList) {
	let nextModules = [];
	let dateDifference = [];
	let n = 0;

	// for each new day (based on unix time) count ++ up till next course
	for (let k = 0; k < moduleList.length; k++) {
		let count = 0;
		for (let i = 1; i < moduleList[k].events.length; i++) {
			for (let j = i - 1; j < i + 1; j++) {
				let date = new Date(moduleList[k].events[j].timeUNIX * 1000);
				let year = date.getFullYear();
				let month = date.getMonth();
				let day = date.getDate();
				dateDifference[n] = day + " " + month + " " + year;
				n++;
			}

			if (
				dateDifference[n - 1] !== dateDifference[n] &&
				moduleList[k].events[i].timeUNIX <= Date.now()
			) {
				count++;
			} //unix day is different from previous count++
		}
		nextModules[k] = count;
	}
	return nextModules;
}

module.exports = { syncModules };
