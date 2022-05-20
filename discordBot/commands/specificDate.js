const { SlashCommandBuilder } = require("@discordjs/builders");
const {
	calendarDayView
} = require("../../fetchCoursedata/calendarGetDayView.js");
const { fetchUser } = require("../../database/manageUserDB.js");
const { MessageEmbed } = require("discord.js");
const { assembler } = require("../../fetchCoursedata/BoodleCourseHandler.js");
const { htmlToString } = require("../../fetchCoursedata/SortingSummary");
const { syncModules } = require("../../helpers/syncModules");
const {
	customEmbedField,
	embedMitosis
} = require("../../helpers/customEmbedField");
const { validateDate } = require("../../helpers/validation");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("show")
		.setDescription("Prints schedule for a given date")
		.addStringOption((option) =>
			option
				.setName("date")
				.setDescription("Prints schedule for a specific date (dd/mm/yyyy).")
				.setRequired(true)
		),

	async execute(interaction) {
		await interaction.deferReply();

		//Validate date
		if (!validateDate(interaction.options.data[0].value)) {
			await interaction.editReply(
				"Date is not valid! Remember format: dd/mm/yyyy"
			);
			return;
		}

		let dateOBJ = {
			day: interaction.options.data[0].value.slice(0, 2),
			month: interaction.options.data[0].value.slice(3, 5),
			year: interaction.options.data[0].value.slice(6, 10)
		};

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
				let nextModule = syncModules(
					summary,
					interaction.options.data[0].value
				);
				let summaryCounter = 0;
				res.forEach((element, i) => {
					let field = new customEmbedField(
						element.instanceName,
						htmlToString(JSON.stringify(element.description)),
						htmlToString(JSON.stringify(element.location)),
						element.time,
						element.fullname,
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
