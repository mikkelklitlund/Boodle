const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window); // @param body

/**
 *
 * @param {string} text string that includes html elements.
 * @returns {string} Same string without html elements.
 */
function html_to_string(text) {
	if (typeof text !== "string") return false;
  /*the newline regex variable, basically makes sure that we replace all the html elemnts in line 10 with \n newline.
	This also includes a newline underneeth a header. */
	let newline = /<\/li>|<\/h[0-9]>|<br[^>]*>|<span[^>]*>/gi;
	let result = text.replace(newline, "\n");
	/* This removes the list start with an empty string, to remove it*/
	let listRemove = /<li>|\\r|\\n/gi;
	result = result.replace(listRemove, "");
	/* This makes the a double newline just before a header.*/
	let headlineStart = /<h[0-9]>/gi;
	result = result.replace(headlineStart, "\n\n");
	/*This removes double whitespaces and double tabulars and so on*/
	let whitespace = /[ \t]{2,}/gi;

	result = result.replace(whitespace, " ");

	/* This removes the start and end of the string, so that jsquery can work upon it.*/
	let startNend = /\[\"|\"\]/gi;
	result = result.replace(startNend, "");
	/* In the return function we use the $ to call the jquery parser, text is then the given text and trim removes whitespaces in the start 
	and ending of the string*/
	try {
		return $(result).text().trim();
	} catch {
		return result.replace(/^"|"$/gi, "");
	}
}

/*this makes it so we can use the function in other documents*/
module.exports = { html_to_string };
