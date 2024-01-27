"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// import { handleMongooseError } from "../../api/middlewares/handleMongooseError";
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, "Set password for user"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: emailRegexp,
        unique: true,
    },
    token: String,
}, { versionKey: false, timestamps: true });
// userSchema.post("save", handleMongooseError);
exports.User = (0, mongoose_1.model)("users", userSchema);
//# sourceMappingURL=users.js.map