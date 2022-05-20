const { format } = require("date-fns");

/**
 * @typedef customEmbedField
 * @type {object}
 * @property {string} title The title of the Moodle event
 * @property {string} description The description of the Moodle event
 * @property {location} location The location of the Moodle event
 * @property {object} time The timeStart and timeDuration of the Moodle event
 * @property {string} courseName The courseName of the Moodle event
 * @property {string} url The url of the Moodle event
 * @property {string} summary The summary of the Moodle event
 */
class customEmbedField {
	// called when making new instance of customEmbedField (e.g new customEmbedField(...))
	/**
     * Fields for MessageEmbed class
    
     * @param {string} title The title or name of the Moodle event
     * @param {string} description The description of Moodle event 
     * @param {string} location The location of the Moodle event
     * @param {object} time The timeStart and timeDuration of the Moodle event
     * @param {string} courseName The courseName of the Moodle event
     * @param {string} url The url of the Moodle event
     * @param {string} summary The summary of the Moodle event
     */
	constructor(title, description, location, time, courseName, url, summary) {
		this.title = title || "Title";
		this.description = description || "No description available";
		this.time = time || { timeStart: 0, timeDuration: 1 };
		this.courseName = courseName || "Course";
		this.url = url || "https://moodle.aau.dk/my";
		this.location = location || "N/A";
		this.summary = summary || "N/A";
	}
	// Method that generates array of objects using this instance values
	/**
	 *
	 * @returns {array} Array of Embed fields with course material inside
	 */
	fieldEmbedifier() {
		// let summaryLen = this.summary.length % 1024;
		let emptyLine = {
			name: "\u200b",
			value: "\u200b",
			inline: false
		};
		let summarySplit = [];
		let offset = 0;
		for (let i = 0; i <= Math.floor(this.summary.length / 900); i++) {
			summarySplit[i] = {
				name: `Summary ${i + 1}`,
				value: this.summary.substring(offset, offset + 899),
				inline: false
			};
			offset += 899;
		}

		let res = [
			{
				name: this.courseName || 'N/A',
				value: this.title || 'N/A',
				inline: false
			},
			{
				name: "Location",
				value: this.location || 'N/A',
				inline: true
			},
			{
				name: "Date",
				value: `${format(new Date(this.time.timeStart) * 1000, "Pp")} ${
					this.time.timeDuration === 1
						? this.time.timeDuration + "hour"
						: this.time.timeDuration / 3600 + " hours"
				}`,
				inline: true
			},
			{
				name: "Description",
				value: this.description + `\n${this.url}`,
				inline: false
			}
		];
		res = res.concat(summarySplit, emptyLine);
		return res;
	}
};
	
function embedMitosis(bigField) {
	let tempArr = [];
		if (JSON.stringify(bigField).length > 5500) {
			let j = 0;
			for (let i = 0; i < bigField.length; i++) {
				
				tempArr[i] = new Array();
				do {
					tempArr[i].push(bigField[j]);
					j++;
					// console.log(j + ' hej');
					// console.log('LÆNGDE '+tempArr[i].toString().length)
				} while (JSON.stringify(tempArr).length < 5499) 
				tempArr[i].pop;
			}
		}
		return tempArr;
	}
	module.exports = { customEmbedField, embedMitosis };
