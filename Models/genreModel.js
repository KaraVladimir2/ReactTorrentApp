import { Schema, model } from "mongoose";

const Genre = new Schema({
  title: { type: String, unique: true, required: true },
});

export default model("Genre", Genre);
