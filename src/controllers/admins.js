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
    return res.status(400).json({
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
    return res.status(400).json({
      message: `Error while getting admin by id ${error}`,
      error: true,
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
    return res.status(400).json({
      message: `Error while creating admin ${error}`,
      error: true,
    });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admins.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(400).json({
        message: 'No admin found',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin deleted',
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error while deleting admin ${error}`,
      error: true,
    });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const admin = await Admins.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admin) {
      return res.status(400).json({
        message: 'No admin found, there is not admin with that id',
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin was updated',
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error while updating admin ${error}`,
      error: true,
    });
  }
};
