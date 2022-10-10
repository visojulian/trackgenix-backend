const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const superAdminAlls = (req, res) => {
  res.status(200).json({ data: superAdmins });
};

const getSuperAdminById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const SuperAdminFound = superAdmins.find((superAdmin) => superAdmin.id === id);
  if (SuperAdminFound) {
    res.status(200).json({ data: SuperAdminFound });
  } else {
    res.status(404).json({ error: 'super admin not found' });
  }
};

const superAdminCreate = (req, res) => {
  const newSA = req.body;
  superAdmins.push(newSA);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins, null, 2), (err) => {
    if (err) {
      res.send('Cannot save New super admin');
    } else {
      res.send('super admin created');
    }
  });
};

const deleteSuperAdmin = (req, res) => {
  const element = parseInt(req.params.id, 10);
  const deleted = superAdmins.filter((superAdmin) => superAdmin.id !== element);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(deleted, null, 2), () => {
    if (!deleted) {
      res.status(404).json({ error: 'Cannot delete super admin' });
    } else {
      res.status(200).json({ data: deleted });
    }
  });
};

const editSuperAdmin = (req, res) => {
  const element = parseInt(req.params.id, 10);
  const editSA = superAdmins.find((superAdmin) => superAdmin.id === element);

  editSA.id = req.body.id;
  editSA.name = req.body.name;
  editSA.lastName = req.body.lastName;
  editSA.email = req.body.email;
  editSA.password = req.body.password;

  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins, null, 2), (err) => {
    if (err) {
      res.status(404).json({ error: 'Cannot edit super admin' });
    } else {
      res.status(200).json({ superAdmins });
    }
  });
};

const filterAdmin = (req, res) => {
  let filterSuperAdmin = superAdmins;
  const queriesArray = Object.keys(req.query);

  queriesArray.forEach((query) => {
    if (query !== 'id' && query !== 'name' && query !== 'lastName' && query !== 'email') {
      res.status(400).json({
        message: 'one or more filters do not exist',
      });
    }
  });

  if (req.query.id) {
    filterSuperAdmin = filterSuperAdmin.filter(
      (superAdmin) => superAdmin.id === Number(req.query.id),
    );
  }
  if (req.query.name) {
    filterSuperAdmin = filterSuperAdmin.filter(
      (superAdmin) => superAdmin.name === req.query.name,
    );
  }
  if (req.query.lastName) {
    filterSuperAdmin = filterSuperAdmin.filter(
      (superAdmin) => superAdmin.lastName === req.query.lastName,
    );
  }
  if (req.query.email) {
    filterSuperAdmin = filterSuperAdmin.filter(
      (superAdmin) => superAdmin.email === req.query.email,
    );
  }
  res.status(200).json({ filterSuperAdmin });
};

module.exports = {
  superAdminAlls,
  getSuperAdminById,
  superAdminCreate,
  deleteSuperAdmin,
  editSuperAdmin,
  filterAdmin,
};
