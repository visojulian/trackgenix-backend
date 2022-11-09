import Joi from 'joi';

const validateEmployeeBody = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z]{3,50}$/)
      .required(),
    lastName: Joi.string().pattern(/^[a-zA-Z]{3,50}$/)
      .required(),
    phone: Joi.number().positive().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,30}$/).required(),
  });

  const validation = employeeValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `Something went wrong with ${validation.error.details[0].path[0]} field.`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateEmployeeBody;
