import { Schema, model } from "mongoose";

// import { handleMongooseError } from "../../api/middlewares/handleMongooseError";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

// userSchema.post("save", handleMongooseError);

export const User = model("users", userSchema);
