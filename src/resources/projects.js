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

// getById projects
const getProjectById = (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projects.find((project) => project.id === projectId);
  if (foundProject) {
    res.status(200).json(foundProject);
  } else {
    res.status(404).json({ msg: `Project not found by id: ${projectId}`, error: true });
  }
};

module.exports = {
  getAllProjects, getActiveProjects, getProjectById,
};
