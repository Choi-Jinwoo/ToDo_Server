import Joi, { SchemaLike } from 'joi';
import { Request, Response } from 'express';
import logger from '../logger';

const validate = (req: Request, res: Response, schema: SchemaLike): boolean => {
  const { body } = req;
  const validation = Joi.validate(body, schema);
  if (validation.error) {
    logger.yellow('검증 오류', validation.error.message);
    res.status(400).json({
      message: '검증 오류.',
    });
    return false;
  }
  return true;
};

export const validateLogin = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    pw: Joi.string().required(),
  });

  return validate(req, res, schema);
};

export const validateRegister = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    id: Joi.string().min(8).max(25).required(),
    pw: Joi.string().required(),
    name: Joi.string().required(),
  });

  return validate(req, res, schema);
};
