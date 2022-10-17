import Joi from 'joi';

const validateTaskBody = (req, res, next) => {
  const taskValidation = Joi.object({
    description: Joi.string().max(150).required(),
  });

  const validation = taskValidation.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: `an error occurred: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};
export default validateTaskBody;
