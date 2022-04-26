const {
  discordIDValidator,
  moodleTokenValidator,
} = require ('../discordBot/routes/register');

test ('Validates Discord ID', () => {
  /* Checks if string lenght is between 17-19 -> return true */
  const discordIdT = '012345678910111213';
  expect (discordIDValidator (discordIdT)).toEqual (true);
  /* Checks if string lenght is less than 17 or bigger than 19 -> return false */
  const discordIdF = '229393';
  expect (discordIDValidator (discordIdF)).toEqual (false);
  /* Checks if it is not a string -> returns null */
  const discordIdN = 33333;
  expect (discordIDValidator (discordIdN)).toEqual (null);
});

test ('Validates Moodle token', () => {
  /* Checks if string lenght is 32 -> return true */
  const moodleTokenT = 'd93e803d5b84808c629c68cbe5221e0f';
  expect (moodleTokenValidator (moodleTokenT)).toEqual (true);
  /* Checks if string lenght is not equal to 32 -> return false */
  const moodleTokenF = 'd93e803d5b84808c629c6f';
  expect (moodleTokenValidator (moodleTokenF)).toEqual (false);
  /* Checks if it is not a string -> returns null */
  const moodleTokenN = 323;
  expect (moodleTokenValidator (moodleTokenN)).toEqual (null);
});
