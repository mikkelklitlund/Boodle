const { strikethrough } = require("@discordjs/builders");
const { text } = require("express");

// function Datainput();
console.log(SortHTML('input the lined that needs to be sorted here.'));
// @param body
function SortHTML(body) {
    /*Uses regexbr to replace <br> with \n*/
    var regexbr = /(<)br><\/li><li>/gi,
    result = body.replace(regexbr, "\n");

/*Uses pattern to remove all the <> tags, aswell as what is written inside of these.*/
    var pattern = /<[^>]*>/gi,

  rmatchResult=result.replace(pattern, " ");
/*replaces some whitespace commands to an actual whitespace*/
  var whitespace = /\&nbsp\;/gi,
whitespaceresult =rmatchResult.replace(whitespace, " ");
/*Removes the multiplewhitespaces around the wtring that comes form the pattern line*/
var doublewhitespace = / +(\W)/g
doublewhitespaceresult = whitespaceresult.replace(doublewhitespace," ");
/*Removes the whitespace in front and end of the string, if there is any.*/
let str =doublewhitespaceresult;
let string_trim = str.trim(doublewhitespaceresult);
  return string_trim;
}

