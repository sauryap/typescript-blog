import mongoose from "mongoose";
import { permission } from "../middleware/permission.middleware";
import { Permission } from "../model/permissionModel";
import { Role } from "../model/roleModel";
export {
  createRoleController,
  getRoleController,
  updateRoleController,
  deleteRoleController,
};

const createRoleController = async (payload: {
  roleName: string;
  permissions: Array<string>;
}) => {
  console.log("role", payload);
  const { roleName, permissions } = payload;
  const role = await Role.findOne({
    roleName,
  });

  if (role) {
    throw { message: "The role already exists", statusCode: 400 };
  } else {
    await Role.create({
      roleName: payload.roleName,
      permission: payload.permissions,
    });
  }
};

const getRoleController = async () => {
  const role = await Role.find();
  return role;
};

const updateRoleController = async (
  roleId: string,
  permissions: Array<string>
) => {
  console.log(permissions);
  const permissionSet = new Set();
  const permissionOnRole = await Role.findById(roleId);
  console.log(permissionOnRole);
  permissionOnRole?.permission.forEach((e) => {
    permissionSet.add(e.toString());
  });

  permissions.forEach((e) => {
    console.log(e);
    permissionSet.add(e);
  });
  await Role.findByIdAndUpdate(roleId, {
    permission: [...permissionSet],
  });
};

const deleteRoleController = async (roleId: String) => {
  await Role.findByIdAndDelete(roleId);
};
