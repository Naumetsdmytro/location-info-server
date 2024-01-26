import { NextFunction } from 'express'

export const handleMongooseError = (error: CustomError, data: any, next: NextFunction) => {
  const { name, code } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  error.status = status;
  next();
};
