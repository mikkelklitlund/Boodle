const { syncModules } = require("../helpers/syncModules");

test("Should give the next module", () => {
	//timeUNIX has to be in seconds (as it is recieved from Moodle)
	//Example with one course on a day
	const moduleList1 = [
		{
			events: [
				{
					courseName: "SLIAL",
					courseID: "24300",
					timeUNIX: "1542351400",
					courseData: "blah blah blah"
				},
				{
					courseName: "SLIAL",
					courseID: "24300",
					timeUNIX: "1552352410",
					courseData: "blah blah blah"
				},
				{
					courseName: "SLIAL",
					courseID: "24300",
					timeUNIX: "1752783400",
					courseData: "blah blah blah"
				},
				{
					courseName: "SLIAL",
					courseID: "24300",
					timeUNIX: "1762783400",
					courseData: "blah blah blah"
				}
			]
		}
	];

	//Example with two courses at the same day
	const moduleList2 = [
		{
			events: [
				{
					courseName: "SLIAL",
					courseID: "24300",
					timeUNIX: "1762783400",
					courseData: "blah blah blah"
				},
				{
					courseName: "SLIAL",
					courseID: "24300",
					timeUNIX: "1762783400",
					courseData: "blah blah blah"
				},
				{
					courseName: "SLIAL",
					courseID: "24300",
					timeUNIX: "1752783400",
					courseData: "blah blah blah"
				},
				{
					courseName: "SLIAL",
					courseID: "24300",
					timeUNIX: "1762783400",
					courseData: "blah blah blah"
				}
			]
		},
		{
			events: [
				{
					courseName: "IWP",
					courseID: "24300",
					timeUNIX: "1642351400",
					courseData: "blah blah blah"
				},
				{
					courseName: "IWP",
					courseID: "24300",
					timeUNIX: "1642351400",
					courseData: "blah blah blah"
				},
				{
					courseName: "IWP",
					courseID: "24300",
					timeUNIX: "1752783400",
					courseData: "blah blah blah"
				},
				{
					courseName: "IWP",
					courseID: "24300",
					timeUNIX: "1762783400",
					courseData: "blah blah blah"
				}
			]
		}
	];

	expect(syncModules(moduleList1)).toEqual([2]);
	expect(syncModules(moduleList2)).toEqual([0, 2]);
});
