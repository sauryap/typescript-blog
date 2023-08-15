import { Router, Request, Response } from "express";
import {
  createUserController,
  loginUserController,
  updateUserController,
  deleteUserController,
} from "../controller/user.controller";
import { failureResponse, successResponse } from "../lib/helper";
import { permission } from "../middleware/permission.middleware";
import { auth } from "../middleware/auth.middleware";
export const userRoute = Router();

userRoute.get("/", async (req: Request, res: Response) => {
  res.json("Logged in");
});

userRoute.post("/signup", async (req: Request, res: Response) => {
  try {
    await createUserController(req.body);
    successResponse(res, 201, "User created", {});
  } catch (error) {
    failureResponse(res, 400, error);
  }
});

userRoute.post("/login", async (req: Request, res: Response) => {
  try {
    const token = await loginUserController(req.body);
    successResponse(res, 200, "Logged in", token);
  } catch (err) {
    failureResponse(res, 400, err);
  }
});

userRoute.patch(
  "/update/:id",
  auth,
  permission("u", "user"),
  async (req: Request, res: Response) => {
    await updateUserController(req.params.id, req.body);
  }
);

userRoute.delete(
  "/delete/:id",
  auth,
  permission("d", "user"),
  async (req: Request, res: Response) => {
    await deleteUserController(req.params.id);
  }
);
