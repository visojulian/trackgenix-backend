const projects = require('../data/projects.json');

// getAll projects
const getAllProjects = (req, res) => {
  res.status(200).json(projects);
};

// getActive projects
const getActiveProjects = (req, res) => {
  const foundProjects = projects.filter((project) => project.isDeleted === false);
  res.status(200).json(foundProjects);
};

module.exports = {
  getAllProjects, getActiveProjects,
};
