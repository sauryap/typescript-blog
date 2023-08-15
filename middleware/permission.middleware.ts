import { Permission } from "../model/permissionModel";
import { Request, Response, NextFunction } from "express";
import { Role } from "../model/roleModel";
import { failureResponse } from "../lib/helper";
import { IPermission } from "../model/model.interface";

export const permission = (permission: string, service: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.token.id;
    const hasRole = req.hasRole;
    const roleId = req.roleId;

    if (hasRole) {
      try {
        let hasMatch: Boolean = false;
        const role = await Role.findById(roleId).populate("permission");
        if (role) {
          hasMatch = matchInfo(
            role.permission,
            permission.toLowerCase(),
            service.toLowerCase()
          );
        }

        if (!hasMatch) {
          const err: object = { message: "Unauthorized" };
          return failureResponse(res, 400, err);
        }
        next();
      } catch (err) {
        const error: Object = { message: "Unauthorized" };
        return failureResponse(res, 400, error);
      }
    } else {
      const error: object = { message: "Unauthorized" };
      return failureResponse(res, 400, error);
    }
  };
};

const matchInfo = (
  permissionArray: Array<IPermission>,
  permission: string,
  service: string
) => {
  /* {Service: ["permissions"]}
  eg: {user: ['a', 'c']} 
  Dynamic therefore using any
  */
  const ObjectData = permissionArray.reduce((acc: any, item: IPermission) => {
    if (!acc[item.service]) {
      acc[item.service] = [];
    }
    acc[item.service].push(item.permission);
    return acc;
  }, {});
  console.log("hello", ObjectData["blog"]?.includes("a"));
  console.log(ObjectData, permission, service);

  console.log("hello2", ObjectData[service].includes("a"));

  try {
    if (
      ObjectData[service]?.includes("a") ||
      ObjectData[service]?.includes(permission)
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
