import { Schema, model } from "mongoose";

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  avatar: {
    Buffer: {
      type: Buffer,
    },
    ContentType: {
      type: String,
    },
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

export default model("User", User);
