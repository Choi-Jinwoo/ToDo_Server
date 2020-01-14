import * as Joi from '@hapi/joi';

export const validateRegister = async (body) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    pw: Joi.string().required(),
    name: Joi.string().required(),
  });

  const { error } = schema.validate(body);
  return error;
};

export const validateLogin = async (body) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    pw: Joi.string().required(),
  });

  const { error } = schema.validate(body);
  return error;
};

export const validateMenu = async (body) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
  });

  const { error } = schema.validate(body);
  return error;
};

export const validateList = async (body) => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
    menu_idx: Joi.number().integer().required(),
  });

  const { error } = schema.validate(body);
  return error;
};

export const validateListModify = async (body) => {
  const schema = Joi.object().keys({
    content: Joi.string(),
    menu_idx: Joi.number().integer(),
  });

  const { error } = schema.validate(body);
  return error;
};