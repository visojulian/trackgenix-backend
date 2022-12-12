import Joi from 'joi';

const validateAdminBody = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string()
      .min(3)
      .max(20)
      .alphanum()
      .pattern(/^([^0-9]*)$/i)
      .trim()
      .required()
      .messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must have at least 3 characters',
        'string.max': 'Name cannot exceed 20 characters',
        'string.alphanum': 'Name cannot not have special characters',
        'string.pattern.base': 'Name can only have letters',
        'string.required': 'Name is required',
      }),
    lastName: Joi.string()
      .min(3)
      .max(25)
      .alphanum()
      .pattern(/^([^0-9]*)$/i)
      .trim()
      .required()
      .messages({
        'string.empty': 'Last Name cannot be empty',
        'string.min': 'Last Name must have at least 3 characters',
        'string.max': 'Last Name cannot exceed 25 characters',
        'string.alphanum': 'Last Name cannot not have special characters',
        'string.pattern.base': 'Last Name can only have letters',
        'string.required': 'Last Name is required',
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required()
      .messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email needs to be a valid email address',
        'string.required': 'Email is required',
      }),
    password: Joi.string().min(8).alphanum().trim()
      .required()
      .messages({
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must have at least 8 characters',
        'string.alphanum': 'Password cannot contain special characters',
        'string.required': 'Password is required',
      }),
  });
  const validation = adminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateEditAdminBody = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string()
      .min(3)
      .max(20)
      .alphanum()
      .pattern(/^([^0-9]*)$/i)
      .trim()
      .required()
      .messages({
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must have at least 3 characters',
        'string.max': 'Name cannot exceed 20 characters',
        'string.alphanum': 'Name cannot not have special characters',
        'string.pattern.base': 'Name can only have letters',
        'string.required': 'Name is required',
      }),
    lastName: Joi.string()
      .min(3)
      .max(25)
      .alphanum()
      .pattern(/^([^0-9]*)$/i)
      .trim()
      .required()
      .messages({
        'string.empty': 'Last Name cannot be empty',
        'string.min': 'Last Name must have at least 3 characters',
        'string.max': 'Last Name cannot exceed 25 characters',
        'string.alphanum': 'Last Name cannot not have special characters',
        'string.pattern.base': 'Last Name can only have letters',
        'string.required': 'Last Name is required',
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .trim()
      .required()
      .messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email needs to be a valid email address',
        'string.required': 'Email is required',
      }),
  });
  const validation = adminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export { validateAdminBody, validateEditAdminBody };
