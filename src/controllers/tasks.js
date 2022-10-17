import Tasks from '../models/Tasks';

const getAllTasks = async (req, res) => {
  try {
    const task = await Tasks.find(req.query);
    if (!task.length) {
      return res.status(404).json({
        message: 'no task found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Task found',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'An error ocurred',
      error,
    });
  }
};

const getTasksById = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: 'no task found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Task found',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred: ${error.message}`,
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
