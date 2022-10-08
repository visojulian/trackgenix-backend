const fs = require('fs');
const projectsData = require('../data/projects.json');

// getAll projects
const getAllProjects = (req, res) => {
  res.json(projectsData);
};

// getById projects
const getProjectsById = (req, res) => {
  const projectId = req.params.id;
  const foundProject = projectsData.find((project) => project.id === projectId);
  if (foundProject) {
    res.send(foundProject);
  } else {
    res.send('Project not found');
  }
};

// create projects
const createProject = (req, res) => {
  const newProject = req.body;
  projectsData.push(newProject);
  fs.writeFile('src/data/projects.json', JSON.stringify(projectsData), (err) => {
    if (err) {
      res.send('Cannot save New Project');
    } else {
      res.send('Project Created');
    }
  });
};

module.exports = { getAllProjects, getProjectsById, createProject };
