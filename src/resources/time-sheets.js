const fs = require('fs');
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
    if (element.id === idValue) {
      filteredArray.push(element);
    }
  });
  res.status(200).json({
    filteredArray,
  });
};

const createTimeSheet = (req, res) => {
  const newTimeSheet = req.body;
  timeSheets.push(newTimeSheet);
  fs.writeFile('./src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      res.send('Cannot save New Project');
    } else {
      res.send('Project Created');
    }
  });
};

module.exports = {
  getAllTimeSheets,
  welcomeTimeSheets,
  filterTimeSheets,
  createTimeSheet,
};
