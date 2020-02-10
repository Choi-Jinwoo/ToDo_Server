import Joi from 'joi';
import validate from './validate';
import { Request, Response } from 'express';

export const validateCreateMenu = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    name: Joi.string().max(40).required(),
  });

  return validate(req, res, schema);
};

export const validateModifyMenu = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    name: Joi.string().max(40).required(),
  });

  return validate(req, res, schema);
};
