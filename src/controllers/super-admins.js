import SuperAdmins from '../models/Super-admins';
import APIError from '../utils/APIError';
import firebase from '../helpers/firebase';

export const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find(req.query);

    return res.status(200).json({
      message: 'Super admins found',
      data: superAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const getSuperAdminById = async (req, res) => {
  try {
    const superAdmin = await SuperAdmins.findById(req.params.id);

    if (!superAdmin) {
      throw new APIError({
        message: 'Super admin not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: 'Super admin found',
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const createSuperAdmin = async (req, res) => {
  try {
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase
      .auth()
      .setCustomUserClaims(newFirebaseUser.uid, { role: 'SUPER_ADMIN' });

    const newSuperAdmin = new SuperAdmins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      firebaseUid: newFirebaseUser.uid,
    });
    const superAdmin = await newSuperAdmin.save();
    return res.status(201).json({
      message: 'Super admin created',
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const deleteSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await SuperAdmins.findById(req.params.id);
    await firebase.auth().deleteUser(superAdmin.firebaseUid);
    const result = await SuperAdmins.findByIdAndDelete(req.params.id);
    if (!result) {
      throw new APIError({
        message: 'Super admin not found',
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

export const editSuperAdmin = async (req, res) => {
  try {
    const result = await SuperAdmins.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!result) {
      throw new APIError({
        message: 'Super admin not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: `Super admin with id: ${req.params.id} edited`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};
