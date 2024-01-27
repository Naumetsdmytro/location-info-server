"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const uriDB = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;
const connection = mongoose_1.default.connect(uriDB);
connection
    .then(() => {
    console.log("Database connection successful");
    app_1.default.listen(PORT, () => {
        console.log(`Server running. Use our API on port: ${PORT}`);
    });
})
    .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
});
//# sourceMappingURL=server.js.map