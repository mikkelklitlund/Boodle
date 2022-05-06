const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window); // @param body

const text =
	'<p dir=\"ltr\" style=\"text-align: left;\"></p><h5>Lecture Outline</h5><ul><li>Graphs &amp; Representations of Graphs</li><li>Breadth-first Search (BFS)</li><li>Depth-first Search (DFS)</li><li>Topological Sorting</li><li>Strongly Connected Components (SCC)</li></ul><p>I will be available for questions from 8:30 to 10:00 in the&nbsp;<a href=\"https://teams.microsoft.com/l/team/19%3aYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2/conversations?groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" target=\"_blank\">ALG-F22 team</a>.&nbsp;Use the&nbsp;<a href=\"https://teams.microsoft.com/l/entity/com.microsoft.teamspace.tab.planner/_djb2_msteams_prefix_1856955484?context=%7B%22subEntityId%22%3Anull%2C%22channelId%22%3A%2219%3AYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2%22%7D&amp;groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" target=\"_blank\">Trashcan tab</a>&nbsp;present in the&nbsp;<a href=\"https://teams.microsoft.com/l/team/19%3aYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2/conversations?groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" target=\"_blank\">ALG-F22 team</a>&nbsp;to ask for help and wait for me to join you in your&nbsp;<strong>virtual room</strong>. Look at the&nbsp;<a href=\"https://www.moodle.aau.dk/mod/resource/view.php?id=1384878\">tutorial video</a>&nbsp;and learn how to use the new trashcan function.<br></p><h5>Readings&nbsp;</h5><p>CLRS Chapter 22&nbsp;</p><h5>Exercise Session (10:00 - 12:00)</h5>Meet with your group in your own group room.&nbsp;Use the&nbsp;<a href=\"https://teams.microsoft.com/l/entity/com.microsoft.teamspace.tab.planner/_djb2_msteams_prefix_1856955484?context=%7B%22subEntityId%22%3Anull%2C%22channelId%22%3A%2219%3AYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2%22%7D&amp;groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" target=\"_blank\">Trashcan tab</a>&nbsp;present in the&nbsp;<a href=\"https://teams.microsoft.com/l/team/19%3aYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2/conversations?groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" target=\"_blank\">ALG-F22 team</a>&nbsp;to ask for help and wait for one of the TAs to come to your group room.&nbsp;Look at the&nbsp;<a href=\"https://www.moodle.aau.dk/mod/resource/view.php?id=1384878\">tutorial video</a>&nbsp;and learn how to use the new trashcan function.<br><p></p>';

/**
 * 
 * @param {string} text string that includes html elements.
 * @returns {string} Same string without html elements.
 */
function html_to_string (text) {
	/*the newline regex variable, basically makes sure that we replace all the html elemnts in line 10 with \n newline.
	This also includes a newline underneeth a header. */
	if (typeof text !== 'string') return false;
  let newline = /<\/li>|<\/h[0-9]>|<br>|<span[^>]*>/gi;
  let result = text.replace (newline, '\n');
/* This removes the list start with an empty string, to remove it*/
	let listRemove = /<li>|\\r|\\n/gi;
	result = result.replace(listRemove, "");
/* This makes the a double newline just before a header.*/
	let headlineStart = /<h[0-9]>/gi;
	result = result.replace(headlineStart, "\n\n");
/*This removes double whitespaces and double tabulars and so on*/
	let whitespace = /[ \t]{2,}/gi;

	result = result.replace(whitespace, "");

/* This removes the start and end of the string, so that jsquery can work upon it.*/
	let startNend = /\[\"|\"\]/gi;
result = result.replace(startNend, "");
/* In the return function we use the $ to call the jquery parser, text is then the given text and trim removes whitespaces in the start
and ending of the string*/
	return $(result).text().trim();
}

console.log(html_to_string(text));
/*this makes it so we can use the function in other documents*/
module.exports = {html_to_string};

