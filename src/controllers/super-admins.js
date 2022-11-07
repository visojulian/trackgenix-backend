import SuperAdmins from "../models/Super-admins";
import APIError from "../utils/APIError";

export const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await SuperAdmins.find(req.query);

    return res.status(200).json({
      message: "Super admins found",
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
        message: "Super admin not found",
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Super admin found",
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
    const superAdmin = new SuperAdmins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await superAdmin.save();
    return res.status(201).json({
      message: "Super admin created",
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

export const deleteSuperAdmin = async (req, res) => {
  try {
    const superAdminDeleted = await SuperAdmins.findByIdAndDelete(
      req.params.id
    );

    if (!superAdminDeleted) {
      throw new APIError({
        message: "Super admin not found",
        status: 404,
      });
    }

    return res.status(204).json({
      message: `Superadmin with id: ${req.params.id} deleted`,
      data: superAdminDeleted,
      error: false,
    });
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
      { new: true }
    );

    if (!result) {
      throw new APIError({
        message: "Super admin not found",
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
