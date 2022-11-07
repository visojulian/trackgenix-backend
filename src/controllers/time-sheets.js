import TimeSheets from "../models/Time-sheets";
import APIError from "../utils/APIError";

export const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheets.find(req.query)
      .populate("task")
      .populate("employee")
      .populate("project");

    return res.status(200).json({
      message: "Timesheets found",
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
      .populate("task")
      .populate("employee")
      .populate("project");
    if (!timeSheet) {
      throw new APIError({
        message: "Timesheet not found",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "Timesheet found",
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
    const result = await timeSheet.save();
    return res.status(201).json({
      message: "Timesheet created",
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
        message: "Timesheet not found",
        status: 404,
      });
    }
    return res.status(204).json({
      message: `Timesheet with id: ${req.params.id} deleted`,
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

export const editTimeSheet = async (req, res) => {
  try {
    const timeSheet = await TimeSheets.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!timeSheet) {
      throw new APIError({
        message: "Timesheet not found",
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
