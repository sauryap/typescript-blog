import mongoose, { Schema, model } from "mongoose";
import { IPermission } from "./model.interface";

const permissionSchema = new Schema<IPermission>({
  permission: {
    type: String,
  },
  service: {
    type: String,
  },
});

export const Permission = model<IPermission>("Permission", permissionSchema);
