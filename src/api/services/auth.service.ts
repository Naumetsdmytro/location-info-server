const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

import { Registration, Login } from '../../types/customTypes'
import { HttpError } from "../helpers";
import { User } from "../../mongoose/models/users";

const { SECRET_KEY } = process.env;

const register = async (registerData: Registration) => {
  const { email, password } = registerData

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({ ...registerData, password: hashPassword });

  return { user: {firstName: createdUser.firstName, lastName: createdUser.lastName, email: createdUser.email } };
};

const login = async (loginData: Login) => {
  const { email, password } = loginData;

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

  return { token, user: { email, fullName: user.firstName + ' ' + user.lastName  } };
};

export default {
  register,
  login,
};
