import app from "./app";
import mongoose from "mongoose";

const uriDB = process.env.DB_HOST as string;
const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(uriDB);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
