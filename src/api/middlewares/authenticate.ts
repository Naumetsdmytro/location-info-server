import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express'

import { HttpError } from "../helpers";
import { User } from "../../mongoose/models/users";
const { SECRET_KEY } = process.env;

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};
