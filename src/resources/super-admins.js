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
module.exports = {
  superAdminAlls, getSuperAdminById, superAdminCreate, deleteSuperAdmin,
};
