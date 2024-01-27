import { CustomError } from '../../app';

export const HttpError = (status: number, message: string): CustomError => {
  const error: CustomError = new Error(message) as CustomError;
  error.status = status;

  return error;
};