import { Router, Request, Response } from "express";

import { failureResponse, successResponse } from "../lib/helper";
import {
  deleteCommentController,
  getAllCommentsController,
  postCommentController,
  updateCommentController,
} from "../controller/comment.controller";
import { auth } from "../middleware/auth.middleware";
import { permission } from "../middleware/permission.middleware";

export const commentRouter = Router();

commentRouter.get("/", async (req: Request, res: Response) => {
  try {
    const comment = await getAllCommentsController();
    return successResponse(res, 200, "Comments Retrieved!!", comment);
  } catch (err) {
    return failureResponse(res, 400, err);
  }
});

commentRouter.post(
  "/:id/create",
  auth,
  permission("c", "comment"),
  async (req: Request, res: Response) => {
    try {
      const userId = req.token.id;
      const comment = await postCommentController(
        req.body.comment,
        userId,
        req.params.id
      );
      return successResponse(res, 200, "Comments Added!!", {});
    } catch (err) {
      return failureResponse(res, 400, err);
    }
  }
);

commentRouter.patch(
  "/update/:id",
  auth,
  permission("u", "comment"),
  async (req: Request, res: Response) => {
    try {
      const userId = req.token.id;
      await updateCommentController(req.body, userId, req.params.id);
      return successResponse(res, 200, "Comments Retrieved!!", {});
    } catch (err) {
      return failureResponse(res, 400, err);
    }
  }
);

commentRouter.delete(
  "/delete/:id",
  auth,
  permission("d", "comment"),
  async (req: Request, res: Response) => {
    try {
      await deleteCommentController(req.params.id);
      return successResponse(res, 201, "Comment Deleted", {});
    } catch (err) {
      return failureResponse(res, 400, err);
    }
  }
);
