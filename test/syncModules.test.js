const {syncModules} = require ('../helpers/syncModules');

test ('Should give the next module', () => {
  const module = [
    {
      courseName: IWP,
      courseID: 90,
      courseID: 32,
      courseData: 9889,
    },
  ];
  expect (syncModules (module)).toEqual (fsfs);
});
