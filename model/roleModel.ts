import mongoose, { Schema, model } from "mongoose";
import { IRole } from "./model.interface";

const roleSchema = new Schema<IRole>({
  roleName: {
    type: String,
    default: "default_role",
    unique: true,
  },
  permission: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
});

export const Role = model("Role", roleSchema);
