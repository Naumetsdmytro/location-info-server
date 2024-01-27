"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const helpers_1 = require("../helpers");
const users_1 = require("../../mongoose/models/users");
const { SECRET_KEY } = process.env;
const register = async (registerData) => {
    const { email, password } = registerData;
    const user = await users_1.User.findOne({ email });
    if (user) {
        throw (0, helpers_1.HttpError)(409, "Email already in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await users_1.User.create({ ...registerData, password: hashPassword });
    return { user: { firstName: createdUser.firstName, lastName: createdUser.lastName, email: createdUser.email } };
};
const login = async (loginData) => {
    const { email, password } = loginData;
    const user = await users_1.User.findOne({ email });
    if (!user) {
        throw (0, helpers_1.HttpError)(401, "Email invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw (0, helpers_1.HttpError)(401, "Password invalid");
    }
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });
    await users_1.User.findByIdAndUpdate(user._id, { token });
    return { token, user: { email, fullName: user.firstName + ' ' + user.lastName } };
};
exports.default = {
    register,
    login,
};
//# sourceMappingURL=auth.service.js.map