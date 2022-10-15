import TimeSheets from '../models/Time-sheets';

export const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheets.find();
    return res.status(200).json({
      message: 'Time sheets found',
      data: timeSheets,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'An error ocurred. Please check!',
      error: err,
    });
  }
};

export const getTimeSheetById = async (req, res) => {
  try {
    const { id } = req.params;
    const timeSheet = await TimeSheets.findById(id);
    return res.status(200).json({
      message: 'Time sheet found',
      data: timeSheet,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'Time sheet not found',
      error: err,
    });
  }
};
