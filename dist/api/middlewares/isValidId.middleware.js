"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = void 0;
const mongoose_1 = require("mongoose");
const HttpError_helper_1 = require("../helpers/HttpError.helper");
const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        next((0, HttpError_helper_1.HttpError)(400, `${id} is not valid id`));
    }
    next();
};
exports.isValidId = isValidId;
//# sourceMappingURL=isValidId.middleware.js.map