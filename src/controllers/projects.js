import Projects from '../models/Projects';
import APIError from '../utils/APIError';

export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find(req.query).populate('employees');

    return res.status(200).json({
      message: 'Projects found',
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.findById(id).populate('employees');

    if (!project) {
      throw new APIError({
        message: 'Project not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: 'Project found',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const createProject = async (req, res) => {
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
      message: 'Project created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const result = await Projects.findByIdAndDelete(req.params.id);

    if (!result) {
      throw new APIError({
        message: 'Project not found',
        status: 404,
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const result = await Projects.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!result) {
      throw new APIError({
        message: 'Project not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: `Project with id: ${req.params.id} edited`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const assignEmployee = async (req, res) => {
  try {
    const result = await Projects.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { employees: req.body } },
      { new: true },
    );

    if (!result) {
      throw new APIError({
        message: 'Project not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: `Employee assigned to project ${req.params.id}`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};
