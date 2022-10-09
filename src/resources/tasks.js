const fs = require('fs');
const tasks = require('../data/tasks.json');

const getAllTasks = (req, res) => {
  res.status(200).json({ data: tasks });
};

const filterTasks = (req, res) => {
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
        console.log(err);
      }
    });
    res.status(200).json({ data: newTask });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
};

module.exports = {
  getAllTasks,
  filterTasks,
  createTask,
  editTask,
};
