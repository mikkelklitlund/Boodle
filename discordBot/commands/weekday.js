const { SlashCommandBuilder } = require("@discordjs/builders");
const {
	calendarDayView,
	getNextWday,
	datePToObj
} = require("../../fetchCoursedata/calendarGetDayView.js");
const { fetchUser } = require("../../database/manageUserDB.js");
const { MessageEmbed } = require("discord.js");
const { assembler } = require("../../fetchCoursedata/BoodleCourseHandler.js");
const { html_to_string } = require("../../fetchCoursedata/SortingSummary");
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
				res.forEach((element, i) => {
					let field = new customEmbedField(
						element.instanceName,
						html_to_string(JSON.stringify(element.description)),
						element.location,
						element.time,
						element.fullname,
						element.url,
						html_to_string(
							JSON.stringify(summary[i].events[nextModule[i]].courseData)
						)
					).fieldEmbedifier();
					let tempArr = [];
					tempArr[i] = field;
					bigField = bigField.concat(tempArr[i]);
				});
				bigField.pop();
				let bigEmbed = new MessageEmbed({
					title: res.length === 1 ? "Course" : "Courses",
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
			})
			.catch((err) => console.error(err));
	}
};
