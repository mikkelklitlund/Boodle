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

module.exports = {discordIDValidator, moodleTokenValidator};
