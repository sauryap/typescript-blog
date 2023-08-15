import { Schema, model } from "mongoose";
import { ICategory } from "./model.interface";

const catgorySchema = new Schema<ICategory>({
  name: {
    type: String,
    max: 6,
  },
  description: {
    type: String,
    maz: 20,
  },
});

export const Category = model("Category", catgorySchema);
