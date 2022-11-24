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
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{8,30}$/).required(),
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

export default validateAdminBody;
