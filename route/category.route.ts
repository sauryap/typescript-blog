import { Router, Request, Response } from "express";
import { failureResponse, successResponse } from "../lib/helper";
import {
  createCategoryController,
  createSingleCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  updateCategoryController,
} from "../controller/category.controller";
import { Category } from "../model/categoryModel";
import { auth } from "../middleware/auth.middleware";
import { permission } from "../middleware/permission.middleware";

export const categoryRouter = Router();

categoryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategoryController();
    return successResponse(res, 201, "Category created", categories);
  } catch (err) {
    return failureResponse(res, 400, err);
  }
});

categoryRouter.post(
  "/create",
  auth,
  permission("c", "category"),
  async (req: Request, res: Response) => {
    try {
      await createSingleCategoryController(req.body);

      return successResponse(res, 201, "Category created", {});
    } catch (err) {
      return failureResponse(res, 400, err);
    }
  }
);

categoryRouter.patch(
  "/update/:id",
  auth,
  permission("u", "category"),
  async (req: Request, res: Response) => {
    try {
      await updateCategoryController(req.params.id, req.body);
      return successResponse(res, 201, "Category Updated", {});
    } catch (err) {
      return failureResponse(res, 400, err);
    }
  }
);

categoryRouter.delete(
  "/delete/:id",
  auth,
  permission("d", "category"),
  async (req: Request, res: Response) => {
    try {
      await deleteCategoryController(req.params.id);
      return successResponse(res, 201, "Category Deleted", {});
    } catch (err) {
      return failureResponse(res, 400, err);
    }
  }
);
