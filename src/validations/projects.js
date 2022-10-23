import Joi from 'joi';

export const validateProjectBody = (req, res, next) => {
  const employeeValidation = Joi.object({
    employee: Joi.string().length(24).required(),
    role: Joi.string().valid('DEV', 'QA', 'TL', 'PM').required(),
    rate: Joi.number().required(),
  });

  const projectValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(150).required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')),
    clientName: Joi.string().min(3).max(50).required(),
    employees: Joi.array().items(employeeValidation),
  });

  const validation = projectValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export const validateEmployee = (req, res, next) => {
  const employeeValidation = Joi.object({
    employee: Joi.string().length(24).required(),
    role: Joi.string().valid('DEV', 'QA', 'TL', 'PM').required(),
    rate: Joi.number().required(),
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

export default validateProjectBody;
