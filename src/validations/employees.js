import Joi from 'joi';

const validateEmployeeBody = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(20)
      .pattern(/^[a-zA-Z]{3,50}$/)
      .messages({
        'string.required': 'Name is required',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must have at least 3 characters',
        'string.max': 'Name cannot exceed 20 characters',
        'string.pattern.base': 'Name can only have letters',
      }),
    lastName: Joi.string()
      .required()
      .min(3)
      .max(25)
      .pattern(/^[a-zA-Z]{3,50}$/)
      .messages({
        'string.required': 'Last Name is required',
        'string.empty': 'Last Name cannot be empty',
        'string.min': 'Last Name must have at least 3 characters',
        'string.max': 'Last Name cannot exceed 25 characters',
        'string.pattern.base': 'Last Name can only have letters',
      }),
    phone: Joi.string()
      .required()
      .length(10)
      .pattern(/^[0-9]*$/)
      .messages({
        'string.required': 'Phone is required',
        'string.empty': 'Phone cannot be empty',
        'string.length': 'Phone cannot exceed 10 numbers',
        'string.pattern.base': 'Phone can only have numbers',
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email needs to be a valid address',
      }),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(/^[a-zA-Z0-9]{8,30}$/)
      .messages({
        'string.required': 'Password is required',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must have at least 8 characters',
        'string.pattern.base': 'Password cannot contain special characters',
      }),
  });

  const validation = employeeValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateEditEmployee = (req, res, next) => {
  const employeeValidation = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(20)
      .pattern(/^[a-zA-Z]{3,50}$/)
      .messages({
        'string.required': 'Name is required',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must have at least 3 characters',
        'string.max': 'Name cannot exceed 20 characters',
        'string.pattern.base': 'Name can only have letters',
      }),
    lastName: Joi.string()
      .required()
      .min(3)
      .max(25)
      .pattern(/^[a-zA-Z]{3,50}$/)
      .messages({
        'string.required': 'Last Name is required',
        'string.empty': 'Last Name cannot be empty',
        'string.min': 'Last Name must have at least 3 characters',
        'string.max': 'Last Name cannot exceed 25 characters',
        'string.pattern.base': 'Last Name can only have letters',
      }),
    phone: Joi.string()
      .required()
      .length(10)
      .pattern(/^[0-9]*$/)
      .messages({
        'string.required': 'Phone is required',
        'string.empty': 'Phone cannot be empty',
        'string.length': 'Phone cannot exceed 10 numbers',
        'string.pattern.base': 'Phone can only have numbers',
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email needs to be a valid address',
      }),
  });

  const validation = employeeValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export { validateEmployeeBody, validateEditEmployee };
