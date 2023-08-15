import { Router, Response, Request } from "express";
import { failureResponse, successResponse } from "../lib/helper";
import {
  createRoleController,
  updateRoleController,
  getRoleController,
  deleteRoleController,
} from "../controller/role.controller";
import { auth } from "../middleware/auth.middleware";
import { permission } from "../middleware/permission.middleware";
export const roleRouter = Router();

roleRouter.get(
  "/",
  auth,
  permission("r", "role"),
  async (req: Request, res: Response) => {
    try {
      const roles = await getRoleController();
      return successResponse(res, 201, "Role retrieved!!", roles);
    } catch (err) {
      return failureResponse(res, 400, err);
    }
  }
);

roleRouter.post(
  "/create",
  auth,
  permission("c", "role"),
  async (req: Request, res: Response) => {
    try {
      await createRoleController(req.body);
      return successResponse(res, 201, "Role create successfully", {});
    } catch (err: any) {
      return failureResponse(res, err?.message, err);
    }
  }
);

roleRouter.patch(
  "/update/:id",
  auth,
  permission("u", "role"),
  async (req: Request, res: Response) => {
    try {
      const role = await updateRoleController(
        req.params.id,
        req.body.permission
      );
      return successResponse(res, 200, "Role Updated", {});
    } catch (err) {
      return failureResponse(res, 400, err);
    }
  }
);

roleRouter.delete(
  "/delete/:id",
  auth,
  permission("d", "role"),
  async (req: Request, res: Response) => {
    try {
      await deleteRoleController(req.params.id);
      return successResponse(res, 200, "Role Deleted", {});
    } catch (err) {
      return failureResponse(res, 400, err);
    }
  }
);
