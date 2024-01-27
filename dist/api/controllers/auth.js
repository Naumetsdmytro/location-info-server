"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const models_1 = require("../../mongoose/models");
const { SECRET_KEY } = process.env;
const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await models_1.User.findOne({ email });
    if (user) {
        throw (0, helpers_1.HttpError)(409, "Email already in use");
    }
    const hashPassword = await bcrypt_1.default.hash(password, 10);
    const newUser = await models_1.User.create({ ...req.body, password: hashPassword });
    res
        .status(201)
        .json({ user: { email: newUser.email, name: newUser.firstName } });
};
const login = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await models_1.User.findOne({ email });
    if (!user) {
        throw (0, helpers_1.HttpError)(401, "Email invalid");
    }
    const passwordCompare = await bcrypt_1.default.compare(password, user.password);
    if (!passwordCompare) {
        throw (0, helpers_1.HttpError)(401, "Password invalid");
    }
    const payload = {
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: "20h" });
    await models_1.User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({ token, user: { email, subscription } });
};
const logout = async (req, res) => {
    const { _id } = req.user;
    await models_1.User.findByIdAndUpdate(_id, { token: "" });
    res.status(200).json({ message: "Logout success" });
};
const current = async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({ user: { email, subscription } });
};
exports.default = {
    register: (0, helpers_1.ctrlWrapper)(register),
    login: (0, helpers_1.ctrlWrapper)(login),
    logout: (0, helpers_1.ctrlWrapper)(logout),
    current: (0, helpers_1.ctrlWrapper)(current),
};
//# sourceMappingURL=auth.js.map