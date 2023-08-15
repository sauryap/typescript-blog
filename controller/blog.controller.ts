import { Blog } from "../model/blogModel";
import { IBlog, ICategory } from "../model/model.interface";
import { createCategoryController } from "./category.controller";

export {
  createBlogController,
  readAllBlogController,
  updateBlogController,
  deleteBlogController,
  readOneBlogController,
};

const createBlogController = async (
  payload: {
    title: string;
    slug: string;
    body: string;
    imgUrl: string;
    category: Array<string>;
    user: string;
  },
  userId: string
) => {
  console.log(payload.category);
  const category: Array<string> = await createCategoryController(
    payload.category
  );
  const blog = new Blog({
    title: payload.title,
    slug: payload.slug,
    body: payload.body,
    imgUrl: payload.imgUrl,
    category: category,
    user: userId,
  });

  // console.log("hello", blog);
  await Blog.create(blog);
};

const readAllBlogController = async () => {
  let queryParams = { status: "published", deleted: false };

  const blogs = await Blog.find(queryParams);
  console.log(blogs);
  return blogs;
};

const readOneBlogController = async (blogId: string) => {
  const blog = await Blog.findOne({
    _id: blogId,
    status: "published",
    deleted: false,
  });
  if (blog) return blog;
  else throw { message: "Blog doesnt exist!!" };
};

const updateBlogController = async (
  blogId: string,
  payload: {
    title: string;
    slug: string;
    body: string;
    imgUrl: string;
    category: Array<string>;
    user: string;
  }
) => {
  const { title, slug, body, imgUrl, category } = payload;
  const categoryArr: Array<string> = await createCategoryController(category);
  await Blog.findByIdAndUpdate(blogId, {
    title,
    slug,
    body,
    imgUrl,
    category: categoryArr,
  });
};

const deleteBlogController = async (blogId: string) => {
  await Blog.findByIdAndDelete(blogId);
};
