import { Router } from "express";
import { userRoute } from "./user.route";
import { permissionRoute } from "./permission.route";
import { roleRouter } from "./role.route";
import { blogRouter } from "./blog.route";
import { categoryRouter } from "./category.route";

export const router = Router();

router.use("/user", userRoute);
router.use("/permission", permissionRoute);
router.use("/role", roleRouter);
router.use("/blog", blogRouter);
router.use("/category", categoryRouter);
