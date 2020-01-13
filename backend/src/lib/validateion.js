import * as Joi from '@hapi/joi';

exports.validateRegister = async (body) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    pw: Joi.string().required(),
    name: Joi.string().required(),
  });

  const { error } = schema.validate(body);
  return error;
};

exports.validateLogin = async (body) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    pw: Joi.string().required(),
  });

  const { error } = schema.validate(body);
  return error;
};