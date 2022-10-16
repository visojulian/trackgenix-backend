import Joi from 'joi';

const validateEmployeesCreation = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(10),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
  });

  const validation = employeeValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `Something went wrong: ${validation.error.details[0].message} `,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateEmployeesCreation,
};
