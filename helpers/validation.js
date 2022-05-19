/**
 * Validates a users discord id
 * @param {string} discordId User's discord id
 * @returns True if the format fits, false if it does not fit, null if it is not a string
 */
function discordIDValidator (discordId) {
  // takes string as input, returns null if not a string, returns true if string contains only regex chars, false otherwise
  if (typeof discordId === 'string') {
    const regex = /^[0-9]{17,19}$/; // only chars in discordId
    if (regex.test (discordId)) return true;
    else return false;
  } else return null;
}

/**
 * Validates a user's moodle token
 * @param {string} moodleToken User's moodle token
 * @returns True if the format fits, false if it does not fit, null if it is not a string
 */
function moodleTokenValidator (moodleToken) {
  // Same as discordIdValidator, but for moodle token with another regex
  if (typeof moodleToken === 'string') {
    const regex = /^[0-9a-f]{32}$/;
    if (regex.test (moodleToken)) return true;
    else return false;
  } else return null;
}

function validateDate (date) {
  if (typeof date !== 'string' || date.length != 10) return false;
  const day = parseInt (date.slice (0, 2));
  const month = parseInt (date.slice (3, 5));
  const year = parseInt (date.slice (6, 10));

  return correctDate (day, month, year);
}

function correctDate (day, month, year) {
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  if (month == 2) {
    if (checkLeap (year)) {
      if (day > 29) return false;
    } else if (day >= 28) return false;
  }

  if (month == 4 || month == 6 || month == 9 || month == 11) {
    if (day > 30) return false;
  }
  return true;
}

function checkLeap (year) {
  return year % 400 == 0 || (year % 100 !== 0 && year % 4 == 0);
}

module.exports = {
  discordIDValidator,
  moodleTokenValidator,
  validateDate,
  correctDate,
  checkLeap,
};
