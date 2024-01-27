import { Request, Response, NextFunction } from 'express'

type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const ctrlWrapper = (controller: ControllerFunction) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};
