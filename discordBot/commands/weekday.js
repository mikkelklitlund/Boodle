const { SlashCommandBuilder } = require("@discordjs/builders");
const {
	calendarDayView,
	getNextWday,
	datePToObj
} = require("../../fetchCoursedata/calendarGetDayView.js");
const { fetchUser } = require("../../database/manageUserDB.js");
const { MessageEmbed } = require("discord.js");
const { assembler } = require("../../fetchCoursedata/BoodleCourseHandler.js");
const { htmlToString } = require("../../fetchCoursedata/SortingSummary");
const { syncModules } = require("../../helpers/syncModules");
const { customEmbedField } = require("../../helpers/customEmbedField");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("weekday")
		.setDescription("Prints schedule for a given weekday")
		.addStringOption((option) =>
			option
				.setName("weekday")
				.setDescription("Prints schedule for next monday.")
				.setRequired(true)
				.addChoice("monday", "monday")
				.addChoice("tuesday", "tuesday")
				.addChoice("wednesday", "wednesday")
				.addChoice("thursday", "thursday")
				.addChoice("friday", "friday")
		),

	async execute(interaction) {
		await interaction.deferReply();
		let dateOBJ;

		switch (interaction.options.data[0].value) {
			case "monday":
				dateOBJ = datePToObj(getNextWday("Monday"));
				break;
			case "tuesday":
				dateOBJ = datePToObj(getNextWday("Tuesday"));
				break;
			case "wednesday":
				dateOBJ = datePToObj(getNextWday("Wednesday"));
				break;
			case "thursday":
				dateOBJ = datePToObj(getNextWday("Thursday"));
				break;
			case "friday":
				dateOBJ = datePToObj(getNextWday("Friday"));
				break;
			default:
				await interaction.editReply("please input a weekday");
				break;
		}

		let summary;
		await fetchUser(interaction.user.id)
			.then(async (res) => {
				if (!res) {
					await interaction.editReply("No moodle token found");
					return;
				} else {
					summary = await assembler(
						res.moodle_token,
						dateOBJ.day,
						dateOBJ.month,
						dateOBJ.year
					);
					return calendarDayView(
						res.moodle_token,
						dateOBJ.day,
						dateOBJ.month,
						dateOBJ.year
					);
				}
			})
			.then(async (res) => {
				let bigField = [];
				let nextModule = syncModules(summary);
				let summaryCounter = 0;
				res.forEach((element, i) => {
					let field = new customEmbedField(
						element.instanceName,
						htmlToString(element.description),
						element.location,
						element.time,
						element.fullName,
						element.url,
						htmlToString(
							JSON.stringify(
								summary[summaryCounter].events[nextModule[summaryCounter]]
									.courseData
							)
						)
					).fieldEmbedifier();
					let tempArr = [];
					tempArr[i] = field;
					bigField = bigField.concat(tempArr[i]);
					if (
						typeof res[i + 1] == "undefined" ||
						res[i].fullName !== res[i + 1].fullName
					) {
						//Need to check whether it is a "double course/module" or not
						summaryCounter++;
					}
				});
				bigField.pop();

				if (JSON.stringify(bigField).length < 5500) {
					let bigEmbed = new MessageEmbed({
						title: res.length < 2 ? "Course" : "Courses",
						url: "https://moodle.aau.dk/my/",
						fields:
							bigField.length == 0
								? [
										{
											name: "No courses",
											value: `No courses found at ${interaction.options.data[0].value}`,
											inline: false
										}
								  ]
								: bigField
					});
					await interaction.editReply({ embeds: [bigEmbed] });
				} else {
					let temparr = embedMitosis(bigField);
					temparr[0].push({
						name: "Message too long",
						value: "Message too long",
						inline: false
					});
					let bigEmbed = new MessageEmbed({
						title: res.length < 2 ? "Course" : "Courses",
						url: "https://moodle.aau.dk/my/",
						fields:
							temparr[0].length == 0
								? [
										{
											name: "No courses",
											value: `No courses found at ${interaction.options.data[0].value}`,
											inline: false
										}
								  ]
								: temparr[0]
					});
					await interaction.editReply({ embeds: [bigEmbed] });
				}
			})
			.catch((err) => console.error(err));
	}
};
