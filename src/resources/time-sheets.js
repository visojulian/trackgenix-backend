const timeSheets = require('../data/time-sheets.json');

const welcomeTimeSheets = (req, res) => {
  res.send('What do you want to do with timesheets? \n 1-Get All 2-Filter 3-Create new');
};

const getAllTimeSheets = (req, res) => {
  res.status(200).json({
    data: timeSheets,
  });
};

const filterTimeSheets = (req, res) => {
  const filteredArray = [];
  const idValue = parseInt(req.params.id, 10);
  timeSheets.forEach((element) => {
    console.log(element.id);
    if (element.id === idValue) {
      filteredArray.push(element);
    }
  });
  console.log(filteredArray);
  res.status(200).json({
    filteredArray,
  });
};

// const createTimeSheet = (req, res) => {
//   res.status(200).json({
//     data:
//   });
// };

module.exports = {
  getAllTimeSheets,
  welcomeTimeSheets,
  filterTimeSheets,
};
