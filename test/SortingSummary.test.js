const {htmlToString} = require ('../fetchCoursedata/SortingSummary');

test ('HTML to JavaScript', () => {
  /* Checks if it is not a string */
  const stringCheck = 2302;
  expect (htmlToString (stringCheck)).toEqual (false);
  /* HTML linebreak to JS linebreak */
  const lineBreak = '<p>Replace HTML linebreak <br> to JS linebreak</p>';
  expect (htmlToString (lineBreak)).toEqual (
    'Replace HTML linebreak \n to JS linebreak'
  );
  /* Remove tags */
  const removeTags = '<p>Remove tags</p>';
  expect (htmlToString (removeTags)).toEqual ('Remove tags');
  /* Fixes ampersand */
  const amp = '<p><h5>HTML &amp; JavaScript</h5></p>';
  expect (htmlToString (amp)).toEqual ('HTML & JavaScript');
  /* Change list to whitespace */
  const list = '<p>blabla<li>blabla</li></p>';
  expect (htmlToString (list)).toEqual ('blablablabla');
  /* Removes double whitespace */
  const doubleWhitespaces = '<p>Remove      double    whitespace</p>';
  expect (htmlToString (doubleWhitespaces)).toEqual (
    'Remove double whitespace'
  );
  /* Double newlines before headers */
  const header = '<p>Test<h1>Hello World</h1></p>';
  expect (htmlToString (header)).toEqual ('Test\n\nHello World');
  /* Remove whitespace in beginning and end of string */
  const trimString = ' <p>Remove whitespace in start and end</p> ';
  expect (htmlToString (trimString)).toEqual (
    'Remove whitespace in start and end'
  );
  /* Remove question marks */
  const qmark =
    '"This removes question marks in "the beginning" and end but not in the middle"';
  expect (htmlToString (qmark)).toEqual (
    'This removes question marks in "the beginning" and end but not in the middle'
  );
});
