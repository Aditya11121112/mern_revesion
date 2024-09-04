import mongoose, { Schema } from "mongoose";

const user_schema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
});

export const user_model = mongoose.model("user", user_schema);
