import { Permission } from "../model/permissionModel";

export const createPermissionController = async (payload: {
  permission: string;
  service: string;
}) => {
  const permissionExist = await Permission.findOne({
    permission: payload.permission,
    service: payload.service,
  });
  if (permissionExist) {
    throw { message: "Permission already exists!" };
  }
  const { permission, service } = payload;
  await Permission.create({ permission, service });
};

export const getPermissionController = async () => {
  const permission = await Permission.find();
  return permission;
};
