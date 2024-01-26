import { express } from 'express';

import controller from "../controllers/auth";
import { validateBody, authenticate } from '../middlewares';
const { schemas } = require("../../service/schemas/users");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controller.register
);

router.post("/login", validateBody(schemas.loginSchema), controller.login);

router.post("/logout", authenticate, controller.logout);

router.get("/current", authenticate, controller.current);

export default router;
