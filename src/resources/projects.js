const fs = require('fs');
const projectsData = require('../data/projects.json');

// getAll projects
const getAllProjects = (req, res) => {
  res.status(200).json(projectsData);
};
// getActive projects
const getActiveProjects = (req, res) => {
  const foundProjects = projectsData.filter((project) => project.isDeleted === false);
  res.status(200).json(foundProjects);
};
// getById projects
const getProjectById = (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projectsData.find((project) => project.id === projectId);
  if (foundProject) {
    res.status(200).json(foundProject);
  } else {
    res.status(404).json({ msg: `Project not found by id: ${projectId}`, error: true });
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

// project filter
const filterProjects = (req, res) => {
  let projectArray = projectsData;
  if (req.query.id) {
    projectArray = projectArray.filter(
      (element) => element.id === parseInt(req.query.id, 10),
    );
  } if (req.query.name) {
    projectArray = projectArray.filter(
      (element) => element.name === req.query.id,
    );
  } if (req.query.description) {
    projectArray = projectArray.filter(
      (element) => element.description === req.query.description,
    );
  } if (req.query.startDate) {
    projectArray = projectArray.filter(
      (element) => element.startDate === req.query.startDate,
    );
  } if (req.query.endDate) {
    projectArray = projectArray.filter(
      (element) => element.endDate === req.query.endDate,
    );
  } if (req.query.clientName) {
    projectArray = projectArray.filter(
      (element) => element.clientName === req.query.clientName,
    );
  } if (req.query.employees) {
    projectArray = projectArray.filter(
      (element) => element.employees === req.query.employees,
    );
  } if (req.query.rate) {
    projectArray = projectArray.filter(
      (element) => element.rate === req.query.rate,
    );
  } res.status(200).json({
    projectArray,
  });
};

module.exports = {
  getAllProjects, getActiveProjects, getProjectById, createProject, filterProjects,
};
