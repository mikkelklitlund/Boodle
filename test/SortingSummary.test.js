const {SortHTML} = require ('../fetchCoursedata/SortingSummary');

test ('HTML to JavaScript', () => {
  /* HTML linebreak to JS linebreak */
  const linebreak = 'Replace HTML linebreak <br> to JS linebreak';
  expect (SortHTML (linebreak)).toEqual (
    'Replace HTML linebreak \n to JS linebreak'
  );
  /* Remove tags */
  const removetags = '<p>Remove tags</p>';
  expect (SortHTML (removetags)).toEqual ('Remove tags');
  /* Fixes ampersand */
  const amp = 'HTML &amp; JavaScript';
  expect (SortHTML (amp)).toEqual ('HTML & JavaScript');
  /* Change non-breaking-whitespace to whitespace */
  const whitespace = 'blabla&nbsp;blabla';
  expect (SortHTML (whitespace)).toEqual ('blabla blabla');
  /* Removes double whitespace */
  const doublewhitespaces = 'Remove       double  whitespace';
  expect (SortHTML (doublewhitespaces)).toEqual ('Remove double whitespace');
  /* Remove whitespace in beginning and end of string */
  const trimstring = ' Remove whitespace in start and end ';
  expect (SortHTML (trimstring)).toEqual ('Remove whitespace in start and end');
});
