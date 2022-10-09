const fs = require('fs');
const admins = require('../data/admins.json');

export const getAllAdmins = (req, res) => {
  res.send((admins));
};

export const getAdminsById = (req, res) => {
  const adminId = req.params.id;
  const oneAdmin = admins.find((admin) => admin.id === Number(adminId));
  if (oneAdmin) {
    res.send(oneAdmin);
  } else {
    res.send(`There is no Admin with id ${req.params.id}`);
  }
};

export const addAdmin = (req, res) => {
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
