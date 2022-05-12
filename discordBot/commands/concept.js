const { SlashCommandBuilder } = require("@discordjs/builders");
const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");
const { fetchUser } = require("../../database/manageUserDB");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("newcourses")
		.setDescription("Tests options feature")
		.addIntegerOption((option) =>
			option
				.setName("input")
				.setDescription("The amount of next courses to show")
				.setRequired(true)
		),
	async execute(interaction) {
		let courselist = ``;
		let title = ``;
		if (interaction.options.get("input").value < 0) {
			interaction.reply("Error, input must be a positive integer");
			return;
		} else if (interaction.options.get("input").value != 1) {
			title = `Your next ${interaction.options.get("input").value} courses:`;
		} else {
			title = `Your next course:`;
		}

		await fetchUser(interaction.user.id)
			.then(async (res) => {
				if (res) {
					//Deferreply cause bot will take longer than 3 secs to respond
					await interaction.deferReply();

					await axios
						.get("https://www.moodle.aau.dk/webservice/rest/server.php", {
							params: {
								wstoken: res.moodle_token,
								wsfunction: "core_calendar_get_calendar_upcoming_view",
								moodlewsrestformat: "json"
							}
						})
						.then(async (res) => {
							if (res.data.errorcode) {
								//If moodle couldn't find any data related to the token
								await interaction.editReply(res.data.message);
							} else {
								for (
									let i = 0;
									i < interaction.options.get("input").value;
									i++
								) {
									courselist += `Course: ${
										res.data.events[i].course.fullname
									}\nLocation: ${
										res.data.events[i].location
									}\nTime: ${timeConverter(
										res.data.events[i].timestart
									)}\nLink: ${res.data.events[i].course.viewurl}\n\n`;
								}
								const message = new MessageEmbed({
									title: `` + title,
									description: `` + courselist
								});
								//Edit reply to contain coursedata
								await interaction.editReply({ embeds: [message] });
							}
						});
				} else {
					//If no user is found in database
					await interaction.reply({
						content:
							"No user found in database, you'll need to set your moodle token first, use: /setup"
					});
				}
			})
			.catch(async (err) => {
				console.log(err);
				await interaction.reply({ content: "Error occured" });
			});
	}
};

//Found at https://stackoverflow.com/a/6078873
function timeConverter(UNIX_timestamp) {
	let a = new Date(UNIX_timestamp * 1000);
	let months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = a.getHours() < 10 ? "0" + a.getHours() : a.getHours();
	let min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
	let time = date + " " + month + " " + year + " " + hour + ":" + min;
	return time;
}
