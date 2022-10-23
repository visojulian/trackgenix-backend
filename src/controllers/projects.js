import Projects from '../models/Projects';

export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find(req.query);

    if (!projects.length) {
      return res.status(404).json({
        message: 'Projects not found',
        error: true,
      });
    }

    return res.status(200).json({
      message: 'All Projects',
      data: projects,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: err,
      error: true,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await Projects.findById(id);

    if (!projects) {
      return res.status(404).json({
        message: `Project ${req.params.id} does not exist`,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Project ${id} found`,
      data: projects,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: err,
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
      message: 'Project created successfully!',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
      data: req.body,
      error: true,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const result = await Projects.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        message: `Project ${req.params.id} does not exist`,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Project ${req.params.id} deleted.`,
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
      error: true,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const result = await Projects.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: `Project ${req.params.id} does not exist`,
        error: true,
      });
    }

    return res.status(200).json({
      message: `Project ${req.params.id} updated.`,
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
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
      return res.status(404).json({
        message: `Project ${req.params.id} does not exist`,
        error: true,
      });
    }

    return res.status(200).json({
      // eslint-disable-next-line no-underscore-dangle
      message: `Employee ${req.body.employee} assign to project ${req.params.id}`,
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
      error: true,
    });
  }
};
