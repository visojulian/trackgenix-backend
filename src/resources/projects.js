const fs = require('fs');
const projects = require('../data/projects.json');
const employeesData = require('../data/employees.json');

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

// create projects
const createProject = (req, res) => {
  const projectId = Number(req.body.id);
  const oneProject = projects.find((project) => project.id === projectId);
  const newProject = req.body;
  const saveProject = {
    id: newProject.id = Number(new Date().getTime().toString().substring(6)),
    name: newProject.name,
    lastName: newProject.lastName,
    email: newProject.email,
    password: newProject.password,
  };
  if (JSON.stringify(newProject) === '{}') {
    res.status(400).send('New Project is empty');
  } else if (oneProject) {
    res.status(400).json({ msg: 'Project already exists!' });
  } else {
    projects.push(saveProject);
  }
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.send('Cannot save New Project');
    } else {
      res.status(201).json('Project Created');
    }
  });
};

// filter projects
const filterProjects = (req, res) => {
  let projectArray = projects;
  const queriesArray = Object.keys(req.query);
  queriesArray.forEach((query) => {
    if (query !== 'id' && query !== 'name' && query !== 'startDate' && query !== 'endDate' && query !== 'clientName' && query !== 'employees') {
      res.status(400).json({
        Error: 'Applied filter does not exist',
      });
    }
  });

  if (req.query.id) {
    projectArray = projectArray.filter(
      (element) => element.id === parseInt(req.query.id, 10),
    );
  } if (req.query.name) {
    projectArray = projectArray.filter(
      (element) => element.name === req.query.name,
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

// Update
const updateProjects = (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projects.find((project) => project.id === projectId);
  if (foundProject) {
    if (req.body.id) foundProject.id = req.body.id;
    if (req.body.name) foundProject.name = req.body.name;
    if (req.body.description) foundProject.description = req.body.description;
    if (req.body.startDate) foundProject.startDate = req.body.startDate;
    if (req.body.endDate) foundProject.endDate = req.body.endDate;
    if (req.body.clientName) foundProject.clientName = req.body.clientName;
    if (req.body.employees) foundProject.employees = req.body.employees;
    if (req.body.isDeleted) foundProject.isDeleted = req.body.isDeleted;

    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.status(500).json({ msg: `Cannot update Project. ${err}`, error: true });
      } else {
        res.status(202).json({ msg: 'Project updated', foundProject, error: false });
      }
    });
  } else {
    res.status(404).json({ msg: `Project not found by id: ${projectId}`, error: true });
  }
};

// Delete
const deleteProjects = (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projects.find((project) => project.id === projectId);
  if (foundProject) {
    foundProject.isDeleted = true;
    fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
      if (err) {
        res.status(500).json({ msg: `Cannot delete Project. ${err}`, error: true });
      }
    });
    res.status(202).json({ msg: `Project deleted by id: ${projectId}`, error: false });
  } else {
    res.status(404).json({ msg: `Project not found by id: ${projectId}`, error: true });
  }
};

// Assign employee
const assignEmployee = (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const foundProject = projects.find((project) => project.id === projectId);
  if (foundProject) {
    const alreadyAssigned = (foundProject.employees.some(
      (employee) => employee.id === req.body.id,
    ));
    const emptyBody = JSON.stringify(req.body) === '{}';
    const employeeExists = (employeesData.some(
      (employee) => employee.id === req.body.id,
    ));
    if (!emptyBody && !alreadyAssigned && employeeExists && req.body.rate >= 0) {
      ((foundProject.employees).push(req.body));
      fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
        if (err) {
          res.status(500).json({ msg: `Cannot assign employees. ${err}`, error: true });
        } else {
          res.status(202).json({ msg: 'Employee assign', foundProject, error: false });
        }
      });
    } else {
      res.status(404).json({
        msg: {
          alreadyAssigned,
          emptyBody,
          employeeDoesNotExists: !employeeExists,
          employeeRate: 'Employee Rate cannot be negative',
        },
        error: true,
      });
    }
  } else {
    res.status(404).json({ msg: `Project not found by id: ${projectId}`, error: true });
  }
};

module.exports = {
  getAllProjects,
  getActiveProjects,
  getProjectById,
  updateProjects,
  deleteProjects,
  assignEmployee,
  createProject,
  filterProjects,
};
