import Employees from '../models/Employees';

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();
    return res.status(200).json({
      message: 'Employees found',
      data: employees,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Something went wrong',
      error: true,
    });
  }
};

const getEmployeesById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employees.findById(id);
    return res.status(200).json({
      message: 'Employee found',
      data: employee,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Something went wrong, this employee does not exists ',
      error: error.message,
    });
  }
};

const createEmployees = async (req, res) => {
  try {
    const employee = new Employees({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await employee.save();
    return res.status(201).json({
      message: 'Employee created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: ' Something went wrong',
      error: true,
    });
  }
};

export default {
  getAllEmployees,
  getEmployeesById,
  createEmployees,
};
