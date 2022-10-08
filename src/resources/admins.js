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
