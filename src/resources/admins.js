const fs = require('fs');
const admins = require('../data/admins.json');

const getAllAdmins = (req, res) => {
  res.send((admins));
};

const getAdminsById = (req, res) => {
  const adminId = req.params.id;
  const oneAdmin = admins.find((admin) => admin.id === Number(adminId));
  if (oneAdmin) {
    res.send(oneAdmin);
  } else {
    res.send(`There is no Admin with id ${req.params.id}`);
  }
};

const addAdmin = (req, res) => {
  const newAdmin = req.body;
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.send('Error! Cannot create new Admin');
    } else {
      res.send(`Admin ${req.body.email} created successfully!`);
    }
  });
};

const deleteAdmin = (req, res) => {
  const adminId = Number(req.params.id);
  const filteredAdmin = admins.filter((admin) => admin.id !== adminId);
  const oneAdmin = admins.find((admin) => admin.id === adminId);
  if (!oneAdmin) {
    res.send(`Cannot delete Admin with id ${req.params.id}, because it doesent exist!`);
  }
  fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmin), (err) => {
    if (err) {
      res.send('An error has ocurred, please check!');
    } else {
      res.send('Admin has been deleted!');
    }
  });
};

module.exports = {
  getAllAdmins,
  getAdminsById,
  addAdmin,
  deleteAdmin,
};
