const { html_to_string } = require("../fetchCoursedata/SortingSummary");

test("HTML to JavaScript", () => {
	/* HTML linebreak to JS linebreak */
	const linebreak = "<p>Replace HTML linebreak <br> to JS linebreak</p>";
	expect(html_to_string(linebreak)).toEqual(
		"Replace HTML linebreak \n to JS linebreak"
	);
	/* Remove tags */
	const removetags = "<p>Remove tags</p>";
	expect(html_to_string(removetags)).toEqual("Remove tags");
	/* Fixes ampersand */
	const amp = "<p><h5>HTML &amp; JavaScript</h5></p>";
	expect(html_to_string(amp)).toEqual("HTML & JavaScript");
	/* Change list to whitespace */
	const list = "<p>blabla<li>blabla</li></p>";
	expect(html_to_string(list)).toEqual("blabla blabla");
	/* Removes double whitespace */
	const doublewhitespaces = "<p>Remove      double    whitespace</p>";
	expect(html_to_string(doublewhitespaces)).toEqual("Remove double whitespace");
	/* Double newlines before headers */
	const header = "<p>Test<h1>Hello World</h1></p>";
	expect(html_to_string(header)).toEqual("Test\n\nHello World");
	/* Remove whitespace in beginning and end of string */
	const trimstring = " <p>Remove whitespace in start and end</p> ";
	expect(html_to_string(trimstring)).toEqual(
		"Remove whitespace in start and end"
	);
});
