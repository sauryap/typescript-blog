import { ICategory } from "../model/model.interface";
import { Category } from "../model/categoryModel";
import mongoose from "mongoose";
//used any from blog
export const createCategoryController = async (payload: Array<string>) => {
  const categories: Array<string> = payload;
  const categoryArray: Array<string> = [];

  for (let x in categories) {
    const categoriesExists = await Category.findOne({ name: categories[x] });
    if (!categoriesExists) {
      const id = new mongoose.Types.ObjectId();
      const category = await Category.create({ _id: id, name: categories[x] });
      categoryArray.push(category.id);
    } else {
      categoryArray.push(categoriesExists.id);
    }
  }

  return categoryArray;
};

export const createSingleCategoryController = async (payload: {
  name: string;
  description: string;
}) => {
  const categoryName = payload.name;
  const categoryDescription = payload.description;

  const category = await Category.findOne({ name: categoryName });

  if (!category) {
    await Category.create({
      name: categoryName,
      description: categoryDescription,
    });
  } else {
    throw { message: "Category already exists!!", statusCode: 400 };
  }
};

export const getAllCategoryController = async () => {
  const category = await Category.find();
  return category;
};

export const updateCategoryController = async (
  categoryId: string,
  payload: { name: string; description: string }
) => {
  let { name, description } = payload;
  await Category.findByIdAndUpdate(categoryId, { name, description });
};

export const deleteCategoryController = async (categoryId: string) => {
  await Category.findByIdAndDelete(categoryId);
};
