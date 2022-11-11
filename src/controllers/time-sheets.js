import TimeSheets from '../models/Time-sheets';
import Tasks from '../models/Tasks';
import Employees from '../models/Employees';
import Projects from '../models/Projects';
import APIError from '../utils/APIError';

export const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheets.find(req.query)
      .populate('task')
      .populate('employee')
      .populate('project');
    timeSheets.forEach(async (element, index) => {
      if (element.task === null) {
        timeSheets.splice(index, 1);
        await TimeSheets.findByIdAndDelete(element.id);
      }
      if (element.employee === null) {
        timeSheets.splice(index, 1);
        await TimeSheets.findByIdAndDelete(element.id);
      }
      if (element.project === null) {
        timeSheets.splice(index, 1);
        await TimeSheets.findByIdAndDelete(element.id);
      }
    });
    return res.status(200).json({
      message: 'Timesheets found',
      data: timeSheets,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const getTimeSheetById = async (req, res) => {
  try {
    const timeSheet = await TimeSheets.findById(req.params.id)
      .populate('task')
      .populate('employee')
      .populate('project');
    if (!timeSheet) {
      throw new APIError({
        message: 'Timesheet not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Timesheet found',
      data: timeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const createTimeSheet = async (req, res) => {
  try {
    const timeSheet = new TimeSheets({
      description: req.body.description,
      date: req.body.date,
      hours: req.body.hours,
      task: req.body.task,
      employee: req.body.employee,
      project: req.body.project,
    });
    let scan = await Tasks.find({ _id: req.body.task });
    if (scan.length === 0) {
      throw new Error('Cannot create timesheet with unexistent task');
    }
    scan = await Employees.find({ _id: req.body.employee });
    if (scan.length === 0) {
      throw new Error('Cannot create timesheet with unexistent employee');
    }
    scan = await Projects.find({ _id: req.body.project });
    if (scan.length === 0) {
      throw new Error('Cannot create timesheet with unexistent project');
    }
    const match = scan[0].employees.filter(
      (employee) => employee.employee.toString() === req.body.employee,
    );
    if (match.length === 0) {
      throw new Error(
        'Cannot create timesheet with an employee not assigned to the selected project',
      );
    }
    const result = await timeSheet.save();
    return res.status(201).json({
      message: 'Timesheet created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const deleteTimeSheet = async (req, res) => {
  try {
    const timeSheet = await TimeSheets.findByIdAndDelete(req.params.id);
    if (!timeSheet) {
      throw new APIError({
        message: 'Timesheet not found',
        status: 404,
      });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const editTimeSheet = async (req, res) => {
  try {
    let scan;
    scan = await Tasks.find({ _id: req.body.task });
    if (scan.length === 0) {
      throw new Error('Cannot update timesheet with unexistent task');
    }
    scan = await Employees.find({ _id: req.body.employee });
    if (scan.length === 0) {
      throw new Error('Cannot update timesheet with unexistent employee');
    }
    scan = await Projects.find({ _id: req.body.project });
    if (scan.length === 0) {
      throw new Error('Cannot update timesheet with non existent project');
    }
    const match = scan[0].employees.filter(
      (employee) => employee.employee.toString() === req.body.employee,
    );
    if (match.length === 0) {
      throw new Error(
        'Cannot update timesheet with an employee unrelated to the project',
      );
    }
    const timeSheet = await TimeSheets.findByIdAndUpdate(
      req.params.id,
      req.body,
      // eslint-disable-next-line comma-dangle
      { new: true }
    );
    if (!timeSheet) {
      throw new APIError({
        message: 'Timesheet not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: `Timesheet with id: ${req.params.id} edited`,
      data: timeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};
