const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window); // @param body

const string5 =
<<<<<<< Updated upstream
	'<p><strong>Litteratur: </strong>[Lay]<strong>&nbsp;</strong>2.1, 2.4 (t.o.m. "Multiplication of Partitioned Matrices")</p>\r\n<p id="yui_3_17_2_1_1643302570186_696"><b>Slides</b>: <a href="https://www.moodle.aau.dk/webservice/pluginfile.php/2390747/course/section/545214/Selvstudie01_en.pdf" id="yui_3_17_2_1_1644527424067_2486">ss1</a>, <a href="https://www.moodle.aau.dk/webservice/pluginfile.php/2390747/course/section/545214/Selvstudie01_en_udfyldt.pdf" id="yui_3_17_2_1_1644527424067_2930">ss1 with doodles</a></p>\r\n<p id="yui_3_17_2_1_1643302570186_716"><b>Videoer</b>: <a href="https://www.moodle.aau.dk/webservice/pluginfile.php/2390747/course/section/545214/01_matrix_add.mp4" id="yui_3_17_2_1_1644527424067_3410">01</a> <a href="https://www.moodle.aau.dk/webservice/pluginfile.php/2390747/course/section/545214/02_matrix_mult.mp4" id="yui_3_17_2_1_1644527424067_3861">02</a> <a href="https://www.moodle.aau.dk/webservice/pluginfile.php/2390747/course/section/545214/03_matrix_transp.mp4" id="yui_3_17_2_1_1644527424067_4321">03</a> <a href="https://www.moodle.aau.dk/webservice/pluginfile.php/2390747/course/section/545214/04_strassens_mult.mp4" id="yui_3_17_2_1_1644527424067_4787">04</a><span id="yui_3_17_2_1_1643302570186_726"></span></p>\r\n<p id="yui_3_17_2_1_1644527424067_990"><b>Oppgaver</b>:&nbsp;</p>\r\n<p></p>\r\n<ul>\r\n    <li>Sum og produkt af matricer. Beregn, hvis defineret. [2.1]&nbsp;<b>1</b>, 3.</li>\r\n    <li>Matrixprodukter&nbsp;<span id="MathJax-Element-15-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><msup><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mi mathvariant=&quot;bold&quot;>u</mi></mrow><mi>T</mi></msup><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mi mathvariant=&quot;bold&quot;>v</mi></mrow></math>" role="presentation">\r\n            <nobr aria-hidden="true"><span id="MathJax-Span-79"><span id="MathJax-Span-80"><span id="MathJax-Span-81"><span id="MathJax-Span-82"><span id="MathJax-Span-83"><span id="MathJax-Span-84">𝐮</span></span></span><sup>𝑇</sup></span><span id="MathJax-Span-86"><span id="MathJax-Span-87"><span id="MathJax-Span-88">𝐯</span></span></span></span></span></nobr>\r\n        </span>,&nbsp;<span id="MathJax-Element-16-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mi mathvariant=&quot;bold&quot;>u</mi></mrow><msup><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mi mathvariant=&quot;bold&quot;>v</mi></mrow><mi>T</mi></msup></math>" role="presentation">\r\n            <nobr aria-hidden="true"><span id="MathJax-Span-89"><span id="MathJax-Span-90"><span id="MathJax-Span-91"><span id="MathJax-Span-92"><span id="MathJax-Span-93">𝐮</span></span></span><span id="MathJax-Span-94"><span id="MathJax-Span-95"><span id="MathJax-Span-96"><span id="MathJax-Span-97">𝐯</span></span></span><sup>𝑇</sup></span></span></span></nobr>\r\n        </span>, hvor&nbsp;<span id="MathJax-Element-17-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mi mathvariant=&quot;bold&quot;>u</mi></mrow><mo>,</mo><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mi mathvariant=&quot;bold&quot;>v</mi></mrow><mo>&amp;#x2208;</mo><msup><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mi mathvariant=&quot;double-struck&quot;>R</mi></mrow><mn>3</mn></msup></math>" role="presentation">\r\n            <nobr aria-hidden="true"><span id="MathJax-Span-99"><span id="MathJax-Span-100"><span id="MathJax-Span-101"><span id="MathJax-Span-102"><span id="MathJax-Span-103">𝐮</span></span></span><span id="MathJax-Span-104">,</span><span id="MathJax-Span-105"><span id="MathJax-Span-106"><span id="MathJax-Span-107">𝐯</span></span></span><span id="MathJax-Span-108">∈</span><span id="MathJax-Span-109"><span id="MathJax-Span-110"><span id="MathJax-Span-111"><span id="MathJax-Span-112">ℝ</span></span></span><sup>3</sup></span></span></span></nobr>\r\n        </span>&nbsp;[2.1] 27.</li>\r\n    <li>Størrelsen af et matrixprodukt. [2.1]&nbsp;<b>7</b></li>\r\n    <li>Forskellen på&nbsp;<span id="MathJax-Element-18-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mi>A</mi><mi>B</mi></math>" role="presentation">\r\n            <nobr aria-hidden="true"><span id="MathJax-Span-114"><span id="MathJax-Span-115"><span id="MathJax-Span-116">𝐴</span><span id="MathJax-Span-117">𝐵</span></span></span></nobr>\r\n        </span>&nbsp;og&nbsp;<span id="MathJax-Element-19-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mi>B</mi><mi>A</mi></math>" role="presentation">\r\n            <nobr aria-hidden="true"><span id="MathJax-Span-118"><span id="MathJax-Span-119"><span id="MathJax-Span-120">𝐵</span><span id="MathJax-Span-121">𝐴</span></span></span></nobr>\r\n        </span>&nbsp;[2.1] 9,&nbsp;<b>11</b></li>\r\n    <li>Matrixprodukt og matrixvektorprodukter. [2.1]&nbsp;<b>13</b></li>\r\n    <li>Hvis&nbsp;<span id="MathJax-Element-20-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mi>C</mi><mi>A</mi><mo>=</mo><msub><mi>I</mi><mi>n</mi></msub></math>" role="presentation">\r\n            <nobr aria-hidden="true"><span id="MathJax-Span-122"><span id="MathJax-Span-123"><span id="MathJax-Span-124">𝐶</span><span id="MathJax-Span-125">𝐴</span><span id="MathJax-Span-126">=</span><span id="MathJax-Span-127"><span id="MathJax-Span-128">𝐼</span><sub>𝑛</sub></span></span></span></nobr>\r\n        </span>&nbsp;har&nbsp;<span id="MathJax-Element-21-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mi>A</mi><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mi mathvariant=&quot;bold&quot;>x</mi></mrow><mo>=</mo><mn>0</mn></math>" role="presentation">\r\n            <nobr aria-hidden="true"><span id="MathJax-Span-130"><span id="MathJax-Span-131"><span id="MathJax-Span-132">𝐴</span><span id="MathJax-Span-133"><span id="MathJax-Span-134"><span id="MathJax-Span-135">𝐱</span></span></span><span id="MathJax-Span-136">=</span><span id="MathJax-Span-137">0</span></span></span></nobr>\r\n        </span>&nbsp;kun løsningen&nbsp;<span id="MathJax-Element-22-Frame" tabindex="0" data-mathml="<math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;><mrow class=&quot;MJX-TeXAtom-ORD&quot;><mi mathvariant=&quot;bold&quot;>x</mi></mrow><mo>=</mo><mn>0</mn></math>" role="presentation">\r\n            <nobr aria-hidden="true"><span id="MathJax-Span-138"><span id="MathJax-Span-139"><span id="MathJax-Span-140"><span id="MathJax-Span-141"><span id="MathJax-Span-142">𝐱</span></span></span><span id="MathJax-Span-143">=</span><span id="MathJax-Span-144">0</span></span></span></nobr>\r\n        </span>&nbsp;[2.1] 23</li>\r\n    <li>True/False [2.1]&nbsp;<b>15</b>, 16</li>\r\n    <li>Multiplikation af blok-matricer. [2.4] 1,2,3</li>\r\n</ul><b>Implementation oppgave: </b>prøv at implementere Strassens algoritme for matrixmultiplikation og sammenligne den med den naive algoritme.&nbsp; Løsningsforslag: live code på <a href="https://mybinder.org/v2/gh/anev-aau/SLIAL22/HEAD?labpath=matrix_operations.ipynb" id="yui_3_17_2_1_1644518674096_2075">Mybinder</a> eller snapshot på <a href="https://github.com/anev-aau/SLIAL22/blob/main/matrix_operations.ipynb" id="yui_3_17_2_1_1644518674096_1937">GitHub</a><br>\r\n<p></p>\r\n<p><b>Videoer (Rob Ghrist):</b></p>\r\n<ul id="yui_3_17_2_1_1643302646430_716">\r\n    <li><a href="https://www.moodle.aau.dk/mod/url/view.php?id=1023685" style="background-color: rgb(255, 255, 255); font-size: 0.9375rem; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;">Addition af matricer. Mulitplikation med en skalar</a></li>\r\n    <li style="" id="yui_3_17_2_1_1643302646430_714"><a href="https://www.moodle.aau.dk/mod/url/view.php?id=1023686" id="yui_3_17_2_1_1643302646430_712">Matrixmultiplikation</a></li></ul>';

const string4 = '<p>Replace HTML linebreak <br> to JS linebreak</p>';
function html_to_string (text) {
  if (typeof text !== 'string') return false;
  let newline = /<\/li>|<\/h[0-9]>|<br>|<span[^>]*>/gi;
  let result = text.replace (newline, '\n');

	let startNend = /\[\"|\"\]/gi;
	result = result.replace(startNend, "");

  let listRemove = /<li>|\\r|\\n/gi;
	result = result.replace(listRemove, " ");

=======
  '<p dir=\"ltr\" style=\"text-align: left;\"></p><h5>Lecture Outline</h5><ul><li>Weighted Graphs and Shortest paths problems</li><li>The Bellman-Ford Algorithm</li><li>Single-source shortest paths in directed acyclic graphs<br></li><li>Dijkstra’s algorithm</li></ul><p>I will be available for questions from 8:30 to 10:00 in the&nbsp;<a href=\"https://teams.microsoft.com/l/team/19%3aYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2/conversations?groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" target=\"_blank\">ALG-F22 team</a>.&nbsp;Use the&nbsp;<a href=\"https://teams.microsoft.com/l/entity/com.microsoft.teamspace.tab.planner/_djb2_msteams_prefix_1856955484?context=%7B%22subEntityId%22%3Anull%2C%22channelId%22%3A%2219%3AYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2%22%7D&amp;groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" target=\"_blank\">Trashcan tab</a>&nbsp;present in the&nbsp;<a href=\"https://teams.microsoft.com/l/team/19%3aYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2/conversations?groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" target=\"_blank\">ALG-F22 team</a>&nbsp;to ask for help and wait for me to join you in your&nbsp;<strong>virtual room</strong>. Look at the&nbsp;<a href=\"https://www.moodle.aau.dk/mod/resource/view.php?id=1384878\">tutorial video</a>&nbsp;and learn how to use the new trashcan function.<br></p><h5>Readings:</h5><p>CLRS Ch 24 until section 24.3 (included)</p><h5>Optional Readings:&nbsp;</h5><p>CLRS Sec. 24.5</p><p></p><h5>Exercise Session (10:00 - 12:00)</h5><p>Meet with your group in your own group room.&nbsp;Use the&nbsp;<a href=\"https://teams.microsoft.com/l/entity/com.microsoft.teamspace.tab.planner/_djb2_msteams_prefix_1856955484?context=%7B%22subEntityId%22%3Anull%2C%22channelId%22%3A%2219%3AYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2%22%7D&amp;groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" target=\"_blank\">Trashcan tab</a>&nbsp;present in the&nbsp;<a href=\"https://teams.microsoft.com/l/team/19%3aYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2/conversations?groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934\" target=\"_blank\">ALG-F22 team</a>&nbsp;to ask for help and wait for one of the TAs to come to your group room.&nbsp;Look at the&nbsp;<a href=\"https://www.moodle.aau.dk/mod/resource/view.php?id=1384878\">tutorial video</a>&nbsp;and learn how to use the new trashcan function.<br></p><br><br><p></p>';
/**
 * 
 * @param {string} text string that includes html elements.
 * @returns {string} Same string without html elements.
 */
function html_to_string (text) {
	/*the newline regex variable, basically makes sure that we replace all the html elemnts in line 10 with \n newline.
	This also includes a newline underneeth a header. */
  let newline = /<\/li>|<\/h[0-9]>|<br>|<span[^>]*>/gi;
  let result = text.replace (newline, '\n');
/* This removes the list start with an empty string, to remove it*/
	let listRemove = /<li>|\\r|\\n/gi;
	result = result.replace(listRemove, "");
/* This makes the a double newline just before a header.*/
>>>>>>> Stashed changes
	let headlineStart = /<h[0-9]>/gi;
	result = result.replace(headlineStart, "\n\n");
/*This removes double whitespaces and double tabulars and so on*/
	let whitespace = /[ \t]{2,}/gi;
<<<<<<< Updated upstream
	result = result.replace(whitespace, " ");

	return $(result).text().trim();
}

module.exports = { html_to_string };
=======
	result = result.replace(whitespace, "");
/* This removes the start and end of the string, so that jsquery can work upon it.*/
	let startNend = /\[\"|\"\]/gi;
result = result.replace(startNend, "");
/* In the return function we use the $ to call the jquery parser, text is then the given text and trim removes whitespaces in the start
and ending of the string*/
	return $(result).text().trim();
}

console.log(html_to_string(string5));
/*this makes it so we can use the function in other documents*/
module.exports = {html_to_string};
>>>>>>> Stashed changes
