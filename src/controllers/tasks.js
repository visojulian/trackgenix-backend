import Tasks from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const task = await Tasks.find();
    return res.status(200).json({
      message: 'Task found',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error ocurred',
      error,
    });
  }
};

const getTasksById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);
    return res.status(200).json({
      message: 'Task found',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred',
      error,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = new Tasks({
      description: req.body.description,
    });
    const resultTask = await newTask.save();
    return res.status(201).json({
      message: 'Task create succesfully',
      data: resultTask,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error.message}`,
      error: true,
    });
  }
};

export default {
  getAllTasks,
  getTasksById,
  createTask,
};
