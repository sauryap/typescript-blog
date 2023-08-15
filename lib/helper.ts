import { Response } from "express";
export {
  successResponse,
  failureResponse,
  hashPassword,
  comparePassword,
  signJWT,
  verifyJWT,
};
import { hash, compare } from "bcryptjs";
import { JwtPayload, sign, verify } from "jsonwebtoken";

const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: Object
) => {
  statusCode = statusCode || 200;
  message = message || "operation successful";
  return res.status(statusCode).json({
    statusCode: statusCode,
    data: data || {},
    message,
  });
};

const failureResponse = (res: Response, statusCode: number, error: any) => {
  statusCode = statusCode || 500;
  const message = error?.message || "something went wrong!!";
  return res.status(statusCode).json({
    status: statusCode,
    message,
  });
};

const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (hashedPassword: string, password: string) => {
  console.log(password, hashedPassword);
  const check = await compare(password, hashedPassword);
  return check;
};

const signJWT = async (payload: Object) => {
  const token = await sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "365d",
  });
  console.log(token);
  return token;
};

const verifyJWT = async (token: string) => {
  try {
    const secret = process.env.JWT_SECRET as string;
    const verified: any = await verify(token, secret);
    return verified;
  } catch (err) {
    return false;
  }
};
