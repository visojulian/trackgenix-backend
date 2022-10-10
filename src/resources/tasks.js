const fs = require('fs');
const tasks = require('../data/tasks.json');

const getAllTasks = (req, res) => {
  res.status(200).json({ data: tasks });
};

const getTasks = (req, res) => {
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
  tasks.push(newTask);
  fs.writeFile('./src/data/tasks.json', JSON.stringify(tasks), (err) => {
    if (err) {
      res.status(404).json({ error: 'Cannot create new task' });
    } else {
      res.status(200).json({ data: 'Task created' });
    }
  });
};

const editTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const putTask = tasks.find((task) => task.id === taskId);
  if (putTask) {
    const index = tasks.indexOf(putTask);
    const newTask = req.body;
    tasks[index] = newTask;
    fs.writeFile('./src/data/tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.send(err);
      }
    });
    res.status(200).json({ data: newTask });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const eliminateTask = tasks.find((task) => task.id === taskId);

  if (eliminateTask === undefined) {
    res.status(404).json({ error: `The task ${req.params.id} does not exist` });
  }

  tasks.splice(tasks.indexOf(eliminateTask), 1);

  res.status(200).json({ eliminateTask });

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

  if (req.query.id) {
    filteredTasks = filteredTasks.filter((task) => task.id === req.query.id);
  }

  if (req.query.title) {
    filteredTasks = filteredTasks.filter((task) => task.title === req.query.title);
  }

  if (req.query.description) {
    filteredTasks = filteredTasks.filter((task) => task.description === req.query.description);
  }

  res.status(200).json({ filteredTasks });
};

module.exports = {
  getAllTasks,
  getTasks,
  createTask,
  editTask,
  deleteTask,
  filterTasks,
};
