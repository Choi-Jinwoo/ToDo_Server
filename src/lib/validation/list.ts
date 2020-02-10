import Joi from 'joi';
import validate from './validate';
import { Request, Response } from 'express';

export const validateCreateList = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    name: Joi.string().max(40).required(),
    menu_idx: Joi.number().integer().required(),
  });

  return validate(req, res, schema);
};
