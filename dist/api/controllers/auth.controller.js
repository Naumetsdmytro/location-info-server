"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const users_1 = require("../../mongoose/models/users");
const user_location_detector_service_1 = require("../../infrustructure/user-location-detector.service");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const register = async (req, res) => {
    const createdUser = await auth_service_1.default.register(req.body);
    res
        .status(201)
        .json(createdUser);
};
const login = async (req, res) => {
    const userIpAddress = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress;
    const userLocation = await (0, user_location_detector_service_1.getContactLocationByIpAddress)(userIpAddress);
    const user = await auth_service_1.default.login(req.body);
    res.status(200).json(user);
};
const logout = async (req, res) => {
    const { _id } = req.user;
    await users_1.User.findByIdAndUpdate(_id, { token: "" });
    res.status(200).json({ message: "Logout success" });
};
const current = async (req, res) => {
    const { email } = req.user;
    res.status(200).json({ user: { email } });
};
exports.default = {
    register: (0, helpers_1.ctrlWrapper)(register),
    login: (0, helpers_1.ctrlWrapper)(login),
    logout: (0, helpers_1.ctrlWrapper)(logout),
    current: (0, helpers_1.ctrlWrapper)(current),
};
//# sourceMappingURL=auth.controller.js.map