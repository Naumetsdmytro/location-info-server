"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("./middlewares");
const router = (0, express_1.Router)();
router.use(middlewares_1.authenticate);
// router.use('/auth', ContactRouter);
exports.default = router;
//# sourceMappingURL=public-api.router.js.map