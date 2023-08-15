import { Router, Request, Response } from "express";
import {
  createPermissionController,
  getPermissionController,
} from "../controller/permission.controller";
import { failureResponse, successResponse } from "../lib/helper";
import { auth } from "../middleware/auth.middleware";
import { permission } from "../middleware/permission.middleware";

export const permissionRoute = Router();

permissionRoute.get(
  "/",
  auth,
  permission("r", "permission"),
  async (req: Request, res: Response) => {
    const permission = await getPermissionController();
    return successResponse(res, 200, "Permission sent", permission);
  }
);

permissionRoute.post(
  "/create",
  auth,
  permission("c", "permission"),
  async (req: Request, res: Response) => {
    try {
      await createPermissionController(req.body);
      return successResponse(res, 201, "Permission Created", {});
    } catch (err: any) {
      return failureResponse(res, err?.statusCode, err);
    }
  }
);
