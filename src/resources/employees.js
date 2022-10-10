const fs = require('fs');
const employees = require('../data/employees.json');

// function to get all employees
const getAllEmployees = (req, res) => {
  res.status(200).json({ data: employees });
};

// function to get employee by id
const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find((element) => element.id === id);
  if (employee) {
    res.status(200).json({ data: employee });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

// function create employee
const createNewEmployee = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find((element) => element.id === id);
  const newEmployee = req.body;
  if (JSON.stringify(newEmployee) === '{}') {
    res.status(404).json({ error: 'Please provide employee data' });
  } else if (employee) {
    res.status(404).json({ error: 'Employee already exists' });
  } else {
    employees.push(newEmployee);
    fs.writeFile('./src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.status(500).json({ error: 'Error writing file' });
      } else {
        res.status(201).json({ newEmployee });
      }
    });
  }
};

// function edit an existing employee
const editAnEmployee = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find((element) => element.id === id);
  if (employee) {
    const index = employees.indexOf(employee);
    const newEmployee = req.body;
    employees[index] = newEmployee;
    fs.writeFile('./src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.status(500).json({ error: 'Error writing file' });
      }
    });
    res.status(200).json({ data: newEmployee });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

// function delete employee
const deleteAnEmployee = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find((element) => element.id === id);
  if (employee) {
    employees.splice(employees.indexOf(employee), 1);
    res.status(201).json({ data: 'Deleted employee' });
    fs.writeFile('./src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.status(500).json({ error: 'Error writing file' });
      }
    });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

// function that gets all employees and then filters by query parameters
const fillterAllEmployees = (req, res) => {
  let filterAll = employees;
  if (req.query.id) {
    filterAll = filterAll.filter((employee) => employee.id === parseInt(req.query.id, 10));
  }
  if (req.query.email) {
    filterAll = filterAll.filter((employee) => employee.email === req.query.email);
  }
  if (req.query.name) {
    filterAll = filterAll.filter((employee) => employee.name === req.query.name);
  }
  if (req.query.lastName) {
    filterAll = filterAll.filter((employee) => employee.lastName === req.query.lastName);
  }
  if (req.query.phone) {
    filterAll = filterAll.filter((employee) => employee.phone === req.query.phone);
  }
  res.status(200).json({ data: filterAll });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createNewEmployee,
  editAnEmployee,
  deleteAnEmployee,
  fillterAllEmployees,
};
