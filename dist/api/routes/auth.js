"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
import { validateBody, authenticate } from "../middlewares";
const users_request_schemas_1 = __importDefault(require("../request-schemas/users.request-schemas"));
const router = express_1.default.Router();
router.post("/register", (0, validateBody)(users_request_schemas_1.default.registerSchema), auth_1.default.register);
router.post("/login", (0, validateBody)(users_request_schemas_1.default.loginSchema), auth_1.default.login);
router.post("/logout", authenticate, auth_1.default.logout);
router.get("/current", authenticate, auth_1.default.current);
const _default = router;
export { _default as default };
//# sourceMappingURL=auth.js.map