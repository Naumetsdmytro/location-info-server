import { Request, Response } from 'express'

import { ctrlWrapper } from "../helpers";
import { User } from "../../mongoose/models/users";
import AuthService from '../services/auth.service'

const register = async (req: Request, res: Response) => {
  const createdUser = await AuthService.register(req.body)

  res
    .status(201)
    .json(createdUser);
};

const login = async (req: Request, res: Response) => {
const user = await AuthService.login(req.body)

  res.status(200).json(user);
};

const logout = async (req: Request, res: Response) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(200).json({ message: "Logout success" });
};

const current = async (req: Request, res: Response) => {
  const { email } = req.user;

  res.status(200).json({ user: { email } });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
};
