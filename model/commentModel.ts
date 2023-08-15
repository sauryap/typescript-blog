import mongoose, { Schema, model } from "mongoose";
import { IComment } from "./model.interface";

const commentSchema = new Schema<IComment>({
  comment: {
    type: String,
    required: [true, "User has not added my comment"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Comment = model<IComment>("Comment", commentSchema);
// module.exports = { Comment };
