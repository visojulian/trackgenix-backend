const timeSheets = require('../data/time-sheets.json');

const welcomeTimeSheets = (req, res) => {
  res.send('What do you want to do with timesheets? \n 1-Get All 2-Filter 3-Create new');
};

const getAllTimeSheets = (req, res) => {
  res.status(200).json({
    data: timeSheets,
  });
};

module.exports = {
  getAllTimeSheets,
  welcomeTimeSheets,
};
