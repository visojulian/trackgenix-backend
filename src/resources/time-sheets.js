const timeSheets = require('../data/time-sheets.json');

const getAllTimeSheets = (req, res) => {
  res.status(200).json({
    data: timeSheets,
  });
};

module.exports = {
  getAllTimeSheets,
};
