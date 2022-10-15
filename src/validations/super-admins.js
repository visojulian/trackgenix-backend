import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const superAdminValidations = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,30}$/).required(),
  });

  const validations = superAdminValidations.validate(req.body);

  if (validations.error) {
    return res.status(400).json({
      message: `There was an error: ${validations.error.details[0].message}`,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
