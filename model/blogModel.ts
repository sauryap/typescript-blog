import mongoose, { Schema, model, mongo } from "mongoose";
import { IBlog } from "./model.interface";

const blogSchema = new Schema<IBlog>({
  title: {
    type: String,
    max: [20, " The length must be below 20"],
    required: [true, "Please enter the title"],
  },
  slug: {
    type: String,
    max: 8,
    unique: true,
  },
  body: {
    type: String,
    max: 360,
  },
  imgUrl: {
    type: String,
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    validate: {
      validator: function (text: string) {
        return text === "draft" || "published" || "archieved";
      },
    },
  },
});

export const Blog = model<IBlog>("Blog", blogSchema);
