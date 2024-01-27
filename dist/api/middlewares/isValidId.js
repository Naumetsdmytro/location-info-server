"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = void 0;
const mongoose_1 = require("mongoose");
const HttpError_1 = require("../helpers/HttpError");
const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        next((0, HttpError_1.HttpError)(400, `${id} is not valid id`));
    }
    next();
};
exports.isValidId = isValidId;
//# sourceMappingURL=isValidId.js.map