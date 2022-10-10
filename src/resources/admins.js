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

const editAdmin = (req, res) => {
  const adminId = Number(req.params.id);
  const oneAdmin = admins.find((admin) => admin.id === adminId);
  if (oneAdmin) {
    const updateAdmin = req.body;
    admins.forEach((admin) => {
      if (admin.id === adminId) {
        oneAdmin.name = updateAdmin.name ? updateAdmin.name : oneAdmin.name;
        oneAdmin.lastName = updateAdmin.lastName ? updateAdmin.lastName : oneAdmin.lastName;
        oneAdmin.email = updateAdmin.email ? updateAdmin.email : oneAdmin.email;
        oneAdmin.password = updateAdmin.password ? updateAdmin.password : oneAdmin.password;
      }
    });
  }
  fs.writeFile('src/data/admins.json', JSON.stringify(admins), (err) => {
    if (err) {
      res.send('Error! Cannot update Admin');
    } else {
      res.send(`Admin ${req.params.id} has been updated successfully!`);
    }
  });
};

const filterAdmin = (req, res) => {
  let filterByParams = admins;

  if (req.query.id) {
    filterByParams = filterByParams.filter(
      (admin) => admin.id === Number(req.query.id),
    );
  }
  if (req.query.name) {
    filterByParams = filterByParams.filter(
      (admin) => admin.name === req.query.name,
    );
  }
  if (req.query.lastName) {
    filterByParams = filterByParams.filter(
      (admin) => admin.lastName === req.query.lastName,
    );
  }
  if (req.query.email) {
    filterByParams = filterByParams.filter(
      (admin) => admin.email === req.query.email,
    );
  }
  res.status(200).json({
    filterByParams,
  });
};

module.exports = {
  getAllAdmins,
  getAdminsById,
  addAdmin,
  deleteAdmin,
  editAdmin,
  filterAdmin,
};
