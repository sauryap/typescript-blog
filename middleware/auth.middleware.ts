import { Request, Response, NextFunction } from "express";
// import { ExtendedRequest } from "../express";
import { failureResponse, successResponse, verifyJWT } from "../lib/helper";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../model/model.interface";
import { User } from "../model/userModel";
import { Role } from "../model/roleModel";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken: string = req.headers.authorization?.split(
      " "
    )[1] as string;
    const token: any = await verifyJWT(bearerToken);
    // console.log("token", token.id);
    if (token) {
      const user: any = await User.findById(token.id);
      if (user) {
        const hasRole: boolean = !!user?.role ? true : false;
        const role = await Role.findById(user?.role);
        const roleId = role?.id;

        req.token = token;
        req.hasRole = hasRole;
        req.roleId = roleId;
      } else {
        throw { message: "Unauthorized" };
      }
    } else {
      throw { message: "Unauthorized" };
    }

    next();
  } catch (err: any) {
    return failureResponse(res, err?.statusCode, err);
  }
};
