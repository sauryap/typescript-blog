export {
  createUserController,
  loginUserController,
  updateUserController,
  deleteUserController,
};
import mongoose from "mongoose";
import { User } from "../model/userModel";
import { Role } from "../model/roleModel";
import { comparePassword, hashPassword, signJWT } from "../lib/helper";

const createUserController: Function = async (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const { name, email, password, role } = payload;
  const id = new mongoose.Types.ObjectId();
  let roleId;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    throw { message: "User already exists" };
  }
  if (role) {
    roleId = await Role.findOne({ name: role });
  }
  const hashedPassword = await hashPassword(password);

  await User.create({
    id,
    name,
    email,
    password: hashedPassword,
    role: roleId,
  });
};

const loginUserController = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });
  if (!user) {
    throw { message: "Email or password incorrect", statusCode: 404 };
  }
  const passwordValidity = await comparePassword(user.password, password);

  if (passwordValidity) {
    const token = await signJWT({ email, id: user.id });
    return { token };
  } else {
    throw { message: "Your Username or password is incorrect" };
  }
};

const updateUserController = async (
  userId: string,
  payload: {
    name: string;
    email: string;
    password: string;
  }
) => {
  const { name, email, password } = payload;
  await User.findByIdAndUpdate(userId, { name, email, password });
};

const deleteUserController = async (userId: string) => {
  await User.findByIdAndDelete(userId);
};
