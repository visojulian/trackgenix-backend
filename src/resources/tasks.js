const fs = require('fs');
const tasks = require('../data/tasks.json');

const getAllTasks = (req, res) => {
  res.status(200).json({ data: tasks });
};

const getTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const foundTask = tasks.find((task) => task.id === taskId);
  if (foundTask) {
    res.status(200).json({ data: foundTask });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

const createTask = (req, res) => {
  const newTask = req.body;
  const isEmpty = JSON.stringify(newTask) === '{}';
  if (isEmpty) {
    res.status(404).json({ error: 'Cannot create new task' });
  } else {
    tasks.push(newTask);
    fs.writeFile('./src/data/tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.status(404).json({ error: 'Cannot create new task' });
      } else {
        res.status(200).json({ data: 'Task created' });
      }
    });
  }
};

const editTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const putTask = tasks.find((task) => task.id === taskId);
  if (!putTask) {
    res.status(404).json({ error: 'Task not found' });
  } else {
    if (req.body.id) {
      putTask.id = req.body.id;
    }

    if (req.body.title) {
      putTask.title = req.body.title;
    }

    if (req.body.description) {
      putTask.description = req.body.description;
    }

    res.status(200).json({ putTask });
    fs.writeFile('./src/data/tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.status(200).json({ data: putTask });
      }
    });
  }
};

const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskToEliminate = tasks.find((task) => task.id === taskId);
  if (taskToEliminate === undefined) {
    res.status(404).json({ error: `The task ${req.params.id} does not exist` });
  }
  tasks.splice(tasks.indexOf(taskToEliminate), 1);
  res.status(200).json({ taskToEliminate });
  fs.writeFile('./src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      res.status(404).json({ error: `Cannot eliminate ${req.params.id} task` });
    } else {
      res.status(200).json({ data: 'Task eliminated' });
    }
  });
};

const filterTasks = (req, res) => {
  let filteredTasks = tasks;
  const queriesArray = Object.keys(req.query);

  queriesArray.forEach((query) => {
    if (query !== 'id' && query !== 'title') {
      res.status(400).json({ error: 'The filter does not exist' });
    }
  });

  if (req.query.id) {
    filteredTasks = filteredTasks.filter((task) => task.id === parseInt(req.query.id, 10));
  }

  if (req.query.title) {
    filteredTasks = filteredTasks.filter((task) => task.title === req.query.title);
  }

  res.status(200).json({ filteredTasks });
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  editTask,
  deleteTask,
  filterTasks,
};
