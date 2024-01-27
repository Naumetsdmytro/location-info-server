"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const models_1 = require("../../mongoose/models");
const { SECRET_KEY } = process.env;
const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next((0, helpers_1.HttpError)(401, "Not authorized"));
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const user = await models_1.User.findById(id);
        if (!user || !user.token || user.token !== token) {
            next((0, helpers_1.HttpError)(401, "Not authorized"));
        }
        req.user = user;
        next();
    }
    catch {
        next((0, helpers_1.HttpError)(401, "Not authorized"));
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map