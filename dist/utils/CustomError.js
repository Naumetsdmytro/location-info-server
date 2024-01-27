"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    status;
    message;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map