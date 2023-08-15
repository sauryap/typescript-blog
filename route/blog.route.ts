import { Router, Request, Response } from "express";
import { failureResponse, successResponse } from "../lib/helper";
import {
  createBlogController,
  readAllBlogController,
  readOneBlogController,
  updateBlogController,
} from "../controller/blog.controller";
import { auth } from "../middleware/auth.middleware";
import { permission } from "../middleware/permission.middleware";
// import { ExtendedRequest } from "../express";

export { blogRouter };

const blogRouter = Router();

blogRouter.get("/", async (req: Request, res: Response) => {
  try {
    const blogs = await readAllBlogController();
    return successResponse(res, 200, " Blogs Retrieved", blogs);
  } catch (err) {
    return failureResponse(res, 400, err);
  }
});

blogRouter.post(
  "/create",
  auth,
  permission("c", "blog"),
  async (req: Request, res: Response) => {
    try {
      console.log("post create", req.body);
      const userId: string = req.token.id;
      console.log("userID", userId);
      await createBlogController(req.body, userId);
      successResponse(res, 201, "Blog Created", {});
    } catch (err: any) {
      failureResponse(res, err?.message, err);
    }
  }
);

blogRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const blog = await readOneBlogController(req.params.id);
    return successResponse(res, 200, " Blogs Retrieved", blog);
  } catch (err) {
    return failureResponse(res, 400, err);
  }
});

blogRouter.post("/update/:id", auth, async (req: Request, res: Response) => {
  await updateBlogController(req.params.id, req.body);
});
