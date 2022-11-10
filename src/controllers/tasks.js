import Tasks from '../models/Tasks';
import APIError from '../utils/APIError';

export const getAllTasks = async (req, res) => {
  try {
    const task = await Tasks.find(req.query);
    return res.status(200).json({
      message: 'Tasks found',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const getTasksById = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);

    if (!task) {
      throw new APIError({
        message: 'Task not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: 'Task found',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
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
      message: 'Task created',
      data: resultTask,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    if (!task) {
      throw new APIError({
        message: 'Task not found',
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

export const editTask = async (req, res) => {
  try {
    const task = await Tasks.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true },
    );
    if (!task) {
      throw new APIError({
        message: 'Task not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: `Task with id: ${req.params.id} edited`,
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};
