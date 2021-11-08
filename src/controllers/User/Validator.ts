import * as Joi from 'joi';

const UserSchemaValidator = Joi.object({ 
  email: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  typeUser: Joi.string().required(),
});

export default UserSchemaValidator;