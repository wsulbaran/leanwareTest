import * as Joi from 'joi';

const workLoadchemaValidator = Joi.object({ 
  project: Joi.string().required(),
  percentage: Joi.number().required(),
});

export default workLoadchemaValidator;