import mongoose, { Schema, model } from "mongoose";
import { IUser } from "./model.interface";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: [true, "Please enter the email!"] },
  password: {
    type: String,
    required: [true, "Please enter the password!"],
    min: 8,
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

export const User = model<IUser>("User", userSchema);
