import Admins from '../models/Admins';

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find(req.query);
    if (!admins.length) {
      return res.status(404).json({
        message: 'No admins found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admins found',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: `Error while getting all admins ${error}`,
      error: true,
    });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const admin = await Admins.findById(req.params.id);
    if (!admin) {
      return res.status(400).json({
        message: 'No admin found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin found',
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Error while getting admin by id',
      error: error.message,
    });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const newAdmin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const admin = await newAdmin.save();
    return res.status(201).json({
      message: 'Admin created',
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Error while creating admin',
      error: error.message,
    });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const admin = await Admins.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!admin) {
      return res.status(400).json({
        message: 'No admin found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin updated',
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Error while updating admin',
      error: error.message,
    });
  }
};
/*

// DELETE AN ADMIN
const deleteAdmin = (req, res) => {
  const adminId = Number(req.params.id);
  const filteredAdmin = admins.filter((admin) => admin.id !== adminId);
  const oneAdmin = admins.find((admin) => admin.id === adminId);
  if (!oneAdmin) {
    res.status(400).json({ msg:
      `Cannot delete Admin with id ${req.params.id}, because it does not exist!` });
  }
  fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmin), (err) => {
    if (err) {
      res.status(400).json({ msg: 'An error has ocurred, please check!' });
    } else {
      res.status(200).json({ msg: `Admin ${adminId} has been deleted!` });
    }
  });
};

// SEARCH ADMINS BY FILTERS
const filterAdmin = (req, res) => {
  let filterByParams = admins;
  // Checking that the user uses the correct filter params.
  const queriesArray = Object.keys(req.query);
  queriesArray.forEach((query) => {
    if (query !== 'id' && query !== 'name' && query !== 'lastName' && query !== 'email') {
      res.status(400).json({ msg: 'The filter you apply does not exist!' });
    }
  });

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
  res.status(200).json({ filterByParams });
};

module.exports = {
  getAllAdmins,
  getAdminsById,
  addAdmin,
  deleteAdmin,
  editAdmin,
  filterAdmin,
};
*/
