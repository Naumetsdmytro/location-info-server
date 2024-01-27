"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ctrlWrapper = void 0;
const ctrlWrapper = (controller) => {
    const func = async (req, res, next) => {
        try {
            await controller(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
    return func;
};
exports.ctrlWrapper = ctrlWrapper;
//# sourceMappingURL=ctrlWrapper.helper.js.map