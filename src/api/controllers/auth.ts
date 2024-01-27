import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { Request, Response } from 'express'

import { HttpError, ctrlWrapper } from "../helpers";
import { User } from "../../mongoose/models";
const { SECRET_KEY } = process.env;

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res
    .status(201)
    .json({ user: { email: newUser.email, name: newUser.firstName } });
};

const login = async (req: Request, res: Response) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({ token, user: { email, subscription } });
};

const logout = async (req: Request, res: Response) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(200).json({ message: "Logout success" });
};

const current = async (req: Request, res: Response) => {
  const { email, firstName } = req.user;

  res.status(200).json({ user: { email, firstName } });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
};
