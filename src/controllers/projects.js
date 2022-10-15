const Projects = require('../models/Projects');

// GetAll
const getAll = async (req, res) => {
  try {
    const projects = await Projects.find();

    return res.status(200).json({
      message: 'All Projects',
      data: projects,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'An error occurred',
      error: err,
    });
  }
};

// Post
const createProject = async (req, res) => {
  try {
    const project = new Projects({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      employees: req.body.employees,
    });
    const result = await project.save();
    return res.status(201).json({
      message: 'Project created successfully!',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'An error occurred',
      data: req.body,
      error: err,
    });
  }
};

// Exports
export default {
  getAll,
  createProject,
};
