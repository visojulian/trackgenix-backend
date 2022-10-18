import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const timeSheetValidation = Joi.object({
    description: Joi.string().min(3).max(150).required(),
    date: Joi.date().iso().required(),
    hours: Joi.number().positive().required(),
    tasks: Joi.string().required(),
  });

  const validation = timeSheetValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `Validation has an error, please check: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default validateCreation;
