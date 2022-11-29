import Admins from '../models/Admins';
import APIError from '../utils/APIError';
import firebase from '../helpers/firebase';

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find(req.query);
    return res.status(200).json({
      message: 'Admins found',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const admin = await Admins.findById(req.params.id);
    if (!admin) {
      throw new APIError({
        message: 'Admin not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Admin found',
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase
      .auth()
      .setCustomUserClaims(newFirebaseUser.uid, { role: 'ADMIN' });

    const newAdmin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      firebaseUid: newFirebaseUser.uid,
    });
    const admin = await newAdmin.save();
    return res.status(201).json({
      message: 'Admin created',
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admins.findById(req.params.id);
    await firebase.auth().deleteUser(admin.firebaseUid);
    const result = await Admins.findByIdAndDelete(req.params.id);
    if (!result) {
      throw new APIError({
        message: 'Admin not found',
        status: 404,
      });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const admin = await Admins.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!admin) {
      throw new APIError({
        message: 'Admin not found',
        status: 404,
      });
    }

    await firebase.auth().updateUser(admin.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(200).json({
      message: `Admin with id: ${req.params.id} edited`,
      data: admin,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};
