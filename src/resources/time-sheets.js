const fs = require('fs');
const timeSheets = require('../data/time-sheets.json');

const getAllTimeSheets = (req, res) => {
  res.status(200).json({
    data: timeSheets,
  });
};

const getTimeSheet = (req, res) => {
  const idValue = parseInt(req.params.id, 10);
  timeSheets.forEach((element) => {
    if (element.id === idValue) {
      res.status(200).json({
        element,
      });
    }
  });
  res.status(404).send('There is no element with that id.');
};

const filterTimeSheets = (req, res) => {
  let filteredArray = timeSheets;
  const queriesArray = Object.keys(req.query);

  queriesArray.forEach((query) => {
    if (query !== 'id' && query !== 'startDate' && query !== 'endDate') {
      res.status(400).json({
        Error: 'One of the filters you applied does not exist',
      });
    }
  });

  if (req.query.id) {
    filteredArray = filteredArray.filter(
      (element) => element.id === parseInt(req.query.id, 10),
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

  res.status(200).json({
    filteredArray,
  });
};

const createTimeSheet = (req, res) => {
  const newTimeSheet = req.body;
  if (JSON.stringify(newTimeSheet) === '{}') {
    res.status(404).send('Cannot create new Timesheet because its empty');
  } else {
    timeSheets.push(newTimeSheet);
    fs.writeFile('./src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
      if (err) {
        res.send('Cannot create new Project');
      } else {
        res.send('Timesheet Created');
      }
    });
  }
};

const editTimeSheet = (req, res) => {
  const idValue = parseInt(req.params.id, 10);
  const editableTimeSheet = timeSheets.find((element) => element.id === idValue);

  if (req.body.id) {
    editableTimeSheet.id = req.body.id;
  }
  if (req.body.startDate) {
    editableTimeSheet.startDate = req.body.startDate;
  }
  if (req.body.endDate) {
    editableTimeSheet.endDate = req.body.endDate;
  }
  if (req.body.description) {
    editableTimeSheet.description = req.body.description;
  }

  res.status(200).json({
    timeSheets,
  });
  fs.writeFile('./src/data/time-sheets.json', JSON.stringify(timeSheets), (err) => {
    if (err) {
      res.send('Cannot edit Timesheet');
    } else {
      res.send('Timesheet edited successfully');
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
      res.send('Cannot delete time sheet.');
    } else {
      res.send('Time sheet deleted successfully');
    }
  });
};

module.exports = {
  getAllTimeSheets,
  filterTimeSheets,
  createTimeSheet,
  editTimeSheet,
  deleteTimeSheet,
  getTimeSheet,
};
