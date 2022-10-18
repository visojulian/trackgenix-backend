import Tasks from '../models/Tasks';

export const getAllTasks = async (req, res) => {
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

export const getTasksById = async (req, res) => {
  try {
    const task = await Tasks.findById(req.id);
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

export const createTask = async (req, res) => {
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

export const deleteTask = async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: 'no task found',
        error: true,
      });
    }
    return res.status(200).json({
      message: `Task with id ${req.params.id} deleted `,
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

export const editTask = async (req, res) => {
  try {
    const task = await Tasks.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true },
    );
    if (!task) {
      return res.status(404).json({
        message: 'no task found',
        error: true,
      });
    }
    return res.status(200).json({
      message: `Task with id ${req.params.id} updated `,
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
