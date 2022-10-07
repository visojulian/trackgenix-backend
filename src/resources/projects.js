const express = require('express');

const router = express.Router();
const projects = require('../data/projects.json');

// getAll projects
router.get('/getAll', (req, res) => {
  res.json(projects);
});

// getById projects
router.get('/getById/:id', (req, res) => {
  const projectId = req.params.id;
  const foundProject = projects.find((project) => project.id === projectId);
  if (foundProject) {
    res.send(foundProject);
  } else {
    res.send('Project not found');
  }
});
module.exports = router;
