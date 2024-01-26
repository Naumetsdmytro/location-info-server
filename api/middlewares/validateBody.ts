import { Request, Response, NextFunction } from 'express'
import Joi from 'joi';

import { HttpError } from '../helpers';

export const validateBody = (schema: Joi.Schema) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};
