const projects = require('../data/projects.json');

// getAll projects
const getAllProjects = (req, res) => {
  res.status(200).json(projects);
};

module.exports = {
  getAllProjects,
};
