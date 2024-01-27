import { NextFunction } from 'express'
import { CustomError } from "../../utils";

export const handleMongooseError = (error: CustomError, data: any, next: NextFunction) => {
  const { name, code } = error as CustomError & { code: number };

  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  error.status = status;
  next();
};
