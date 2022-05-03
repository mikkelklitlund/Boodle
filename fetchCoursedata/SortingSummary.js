const { strikethrough } = require("@discordjs/builders");
const { text } = require("express");

// function Datainput();
console.log(
  SortHTML(
    '<p dir="ltr" style="text-align: left;"></p><h5>Lecture Outline</h5><ul><li>Graphs &amp; Representations of Graphs</li><li>Breadth-first Search (BFS)</li><li>Depth-first Search (DFS)</li><li>Topological Sorting</li><li>Strongly Connected Components (SCC)</li></ul><p>I will be available for questions from 8:30 to 10:00 in the&nbsp;<a href="https://teams.microsoft.com/l/team/19%3aYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2/conversations?groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934" target="_blank">ALG-F22 team</a>.&nbsp;Use the&nbsp;<a href="https://teams.microsoft.com/l/entity/com.microsoft.teamspace.tab.planner/_djb2_msteams_prefix_1856955484?context=%7B%22subEntityId%22%3Anull%2C%22channelId%22%3A%2219%3AYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2%22%7D&amp;groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934" target="_blank">Trashcan tab</a>&nbsp;present in the&nbsp;<a href="https://teams.microsoft.com/l/team/19%3aYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2/conversations?groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934" target="_blank">ALG-F22 team</a>&nbsp;to ask for help and wait for me to join you in your&nbsp;<strong>virtual room</strong>. Look at the&nbsp;<a href="https://www.moodle.aau.dk/mod/resource/view.php?id=1384878">tutorial video</a>&nbsp;and learn how to use the new trashcan function.<br></p><h5>Readings&nbsp;</h5><p>CLRS Chapter 22&nbsp;</p><h5>Exercise Session (10:00 - 12:00)</h5>Meet with your group in your own group room.&nbsp;Use the&nbsp;<a href="https://teams.microsoft.com/l/entity/com.microsoft.teamspace.tab.planner/_djb2_msteams_prefix_1856955484?context=%7B%22subEntityId%22%3Anull%2C%22channelId%22%3A%2219%3AYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2%22%7D&amp;groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934" target="_blank">Trashcan tab</a>&nbsp;present in the&nbsp;<a href="https://teams.microsoft.com/l/team/19%3aYMjhbyRofUCdhv9rODckc4pzhoRq-VbY2fH0Oe7IPnQ1%40thread.tacv2/conversations?groupId=5d521c42-2f30-4088-89ac-1021cf208e7e&amp;tenantId=f5dbba49-ce06-496f-ac3e-0cf14361d934" target="_blank">ALG-F22 team</a>&nbsp;to ask for help and wait for one of the TAs to come to your group room.&nbsp;Look at the&nbsp;<a href="https://www.moodle.aau.dk/mod/resource/view.php?id=1384878">tutorial video</a>&nbsp;and learn how to use the new trashcan function.<br><p></p>'
  )
);
// @param body
function SortHTML(body) {
  /*Uses regexbr to replace <br> with \n*/
  var regexbr = /(<)br><\/li><li>/gi,
    result = body.replace(regexbr, "\n");

  /*Uses pattern to remove all the <> tags, aswell as what is written inside of these.*/
  var pattern = /<[^>]*>/gi,
    rmatchResult = result.replace(pattern, " ");
  /*replaces some whitespace commands to an actual whitespace*/
  var amp = /amp;/g;
  ampresult = rmatchResult.replace(amp, "");
  var whitespace = /\&nbsp/gi,
    whitespaceresult = ampresult.replace(whitespace, " ");
  /*Removes the multiplewhitespaces around the wtring that comes form the pattern line*/

  var doublewhitespace = / +(\W)/g;
  doublewhitespaceresult = whitespaceresult.replace(doublewhitespace, " ");

  /*Removes the whitespace in front and end of the string, if there is any.*/
  let str = doublewhitespaceresult;
  let string_trim = str.trim(doublewhitespaceresult);
  return string_trim;
}
