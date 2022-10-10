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

const getTimeSheet = (req, res) => {
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

const filterTimeSheets = (req, res) => {
  let filteredArray = timeSheets;

  if (req.query.id) {
    filteredArray = filteredArray.filter(
      (element) => element.id === req.query.id,
    );
  }

  if (req.query.startDate) {
    filteredArray = filteredArray.filter(
      (element) => element.startDate === req.query.startDate,
    );
  }

  if (req.query.endDate) {
    filteredArray = filteredArray.filter(
      (element) => element.endDate === req.query.endDate,
    );
  }

  if (req.query.description) {
    filteredArray = filteredArray.filter(
      (element) => element.description === req.query.description,
    );
  }

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

const editTimeSheet = (req, res) => {
  const idValue = Number(req.params.id);
  const editableTimeSheet = timeSheets.find((element) => element.id === idValue);

  editableTimeSheet.id = req.body.id;
  editableTimeSheet.startDate = req.body.startDate;
  editableTimeSheet.endDate = req.body.endDate;
  editableTimeSheet.description = req.body.description;

  res.status(200).json({
    timeSheets,
  });
  fs.writeFile('./src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      res.send('Cannot save New Project');
    } else {
      res.send('Project Created');
    }
  });
};

const deleteTimeSheet = (req, res) => {
  const idValue = parseInt(req.params.id, 10);
  const removeThisTimesheet = timeSheets.find((element) => element.id === idValue);

  if (removeThisTimesheet === undefined) {
    res.send('The timesheet you are trying to delete does not exist.');
  }

  timeSheets.splice(timeSheets.indexOf(removeThisTimesheet), 1);

  res.status(200).json({
    timeSheets,
  });
  fs.writeFile('./src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      res.send('Created New Project');
    } else {
      res.send('Cannot delete');
    }
  });
};

module.exports = {
  getAllTimeSheets,
  welcomeTimeSheets,
  filterTimeSheets,
  createTimeSheet,
  editTimeSheet,
  deleteTimeSheet,
  getTimeSheet,
};
