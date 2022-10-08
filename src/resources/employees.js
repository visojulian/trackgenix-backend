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
  const newEmployee = req.body;
  employees.push(newEmployee);
  res.status(201).json({ newEmployee });
  fs.writeFile('./src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

// function edit an existing employee
const editAnEmployee = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find((element) => element.id === id);
  if (employee) {
    const index = employees.indexOf(employee);
    const newEmployee = req.body;
    employees[index] = newEmployee;
    res.status(200).json({ data: employees });
    fs.writeFile('./src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

// function delete employee
const deleteAnEmployee = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = employees.find((element) => element.id === id);
  if (employee) {
    const deleteEmployee = req.body;
    employees.push(deleteEmployee);
    res.status(201).json({ deleteEmployee });
    fs.writeFile('./src/data/employees.json', JSON.stringify(employees), (err) => {
      if (err) {
        console.log(err);
      }
    });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

// function to fillter all employees and get all employees by

module.exports = {
  getAllEmployees, getEmployeeById, createNewEmployee, editAnEmployee, deleteAnEmployee,
};
