const fs = require('fs');
const employees = require('../data/employees.json');

const getAllEmployees = (req, res) => {
  res.status(200).json({ data: employees });
};

const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find((element) => element.id === id);
  if (employee) {
    res.status(200).json({ data: employee });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

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

const editAnEmployee = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find((element) => element.id === id);
  if (employee) {
    const newEmployee = req.body;
    employees.forEach((element) => {
      if (element.id === id) {
        employee.email = newEmployee.email ? newEmployee.email : employee.email;
        employee.password = newEmployee.password ? newEmployee.password : employee.password;
        employee.name = newEmployee.name ? newEmployee.name : employee.name;
        employee.lastName = newEmployee.lastName ? newEmployee.lastName : employee.lastName;
        employee.phone = newEmployee.phone ? newEmployee.phone : employee.phone;
      }
    });
    fs.writeFile('./src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.status(400).json({ error: 'Error writing file' });
      } else {
        res.status(200).json({ data: 'Updated employee' });
      }
    });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

const deleteAnEmployee = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find((element) => element.id === id);
  if (employee) {
    employees.splice(employees.indexOf(employee), 1);
    fs.writeFile('./src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        res.status(500).json({ error: 'Error writing file' });
      } else {
        res.status(201).json({ data: 'Deleted employee' });
      }
    });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

const fillterAllEmployees = (req, res) => {
  let filterAll = employees;
  const queriesArray = Object.keys(req.query);
  queriesArray.forEach((query) => {
    if (query !== 'id'
      && query !== 'email'
      && query !== 'name'
      && query !== 'lastName'
      && query !== 'phone') {
      res.status(400).json({
        message: 'message',
      });
    } else {
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
    }
  });
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createNewEmployee,
  editAnEmployee,
  deleteAnEmployee,
  fillterAllEmployees,
};
