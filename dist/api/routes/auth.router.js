"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const middlewares_1 = require("../middlewares");
const users_request_schemas_1 = __importDefault(require("../request-schemas/users.request-schemas"));
const router = express_1.default.Router();
router.post("/register", (0, middlewares_1.validateBody)(users_request_schemas_1.default.registerSchema), auth_controller_1.default.register);
router.post("/login", (0, middlewares_1.validateBody)(users_request_schemas_1.default.loginSchema), auth_controller_1.default.login);
router.post("/logout", middlewares_1.authenticate, auth_controller_1.default.logout);
router.get("/current", middlewares_1.authenticate, auth_controller_1.default.current);
exports.default = router;
//# sourceMappingURL=auth.router.js.map