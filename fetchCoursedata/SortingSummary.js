const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window); 


const text =
	'<h5 id=\"yui_3_17_2_1_1644139236626_3404\">Lecture Outline:</h5><ul id=\"yui_3_17_2_1_1644137937790_4052\"><li id=\"yui_3_17_2_1_1644137937790_4051\">Insertion sort</li><li id=\"yui_3_17_2_1_1644138431152_17768\">Loop invariants for proving correctness</li><li id=\"yui_3_17_2_1_1644138431152_17769\">Asymptotic notation &amp; Asymptotic analysis</li></ul><p id=\"yui_3_17_2_1_1644138431152_17770\">I will be available for questions from 8:30 to 10:00 in the<a href=\"https://teams.microsoft.com/l/team/19%3add327323fc8a43afb0861ad02b8f5461%40thread.tacv2/conversations?groupId=f6657894-a8bb-496d-94f2-a307ab94fcf3&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" target=\"_blank\" id=\"yui_3_17_2_1_1644138431152_17771\">&nbsp;</a><a href=\"https://teams.microsoft.com/l/team/19%3aYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2/conversations?groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" id=\"yui_3_17_2_1_1644138431152_7608\" target=\"_blank\">ALG-F22</a>&nbsp;team.&nbsp;<span id=\"yui_3_17_2_1_1644138431152_3563\">Use the&nbsp;</span><a href=\"https://help.aau.dk/cs/alg\" target=\"_blank\" id=\"yui_3_17_2_1_1644138431152_6715\">Digital trashcan</a><span id=\"yui_3_17_2_1_1644138431152_5462\">&nbsp;to ask for help.</span><br id=\"yui_3_17_2_1_1644138431152_17772\"></p><h5 id=\"yui_3_17_2_1_1644138431152_22437\">Readings:</h5><p id=\"yui_3_17_2_1_1644137937790_4025\">CLRS: Ch 2 (pp 16-29) and Ch3 (pp. 43-53, read by yourself small-«math xmlns=¨http://www.w3.org/1998/Math/MathML¨»«mi»§#959;«/mi»«/math»&nbsp;and small-«math xmlns=¨http://www.w3.org/1998/Math/MathML¨»«mi»§#969;«/mi»«/math»&nbsp;notation)</p><h5 id=\"yui_3_17_2_1_1644137937790_4072\">Optional Readings:</h5><p id=\"yui_3_17_2_1_1644137937790_4059\">Refresh your knowledge on some basic properties of common functions such as logarithm, polynomials, exponential, factorial, etc.&nbsp;<span id=\"yui_3_17_2_1_1644137937790_4079\">CLRS: Ch 3 (pp. 53-60</span></p><h5 id=\"yui_3_17_2_1_1644138431152_20117\">Exercise Session (10:00 - 12:00)</h5>Work together with your group in your group room (if you wish you may still use your virtual group room).&nbsp;<span id=\"yui_3_17_2_1_1644138431152_3563\">Use the&nbsp;</span><a href=\"https://help.aau.dk/cs/alg\" target=\"_blank\" id=\"yui_3_17_2_1_1644138431152_6715\">Digital trashcan</a><span id=\"yui_3_17_2_1_1644138431152_5462\">&nbsp;to ask for help and wait in&nbsp;<span id=\"yui_3_17_2_1_1644138431152_5619\">your&nbsp;</span><strong id=\"yui_3_17_2_1_1644138431152_5797\">virtual group room&nbsp;</strong>in the&nbsp;<a href=\"https://teams.microsoft.com/l/team/19%3aYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2/conversations?groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" id=\"yui_3_17_2_1_1644138431152_7608\" target=\"_blank\">ALG-F22</a>&nbsp;team<strong>&nbsp;</strong>for one of the TAs to join you<strong id=\"yui_3_17_2_1_1644138431152_6784\">.</strong></span><span id=\"yui_3_17_2_1_1644138431152_7482\">&nbsp;</span>"';


/**
 *
 * @param {string} text string that includes html elements.
 * @returns {string} Same string without html elements.
 */
function html_to_string(text) {
	if (typeof text !== "string") return false;
  /*the newline regex variable, basically makes sure that we replace all the html elemnts in line 10 with \n newline.
	This also includes a newline underneeth a header. */

	if (typeof text !== 'string') return false;
  let newline = /<\/li>|<\/h[0-9]>|<br[^>]*>|<span[^>]*>/gi;
  let result = text.replace (newline, '\n');
/* This removes the list start with an empty string, to remove it*/
	let listRemove = /<li>|\\r|\\n|«[^]*»/gi;

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
