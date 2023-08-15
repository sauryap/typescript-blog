import { Request } from "express";

// export interface ExtendedRequest extends Request {
//   auth: {
//     token: {
//       email: String;
//       id: String;
//       iat: number;
//       exp: number;
//     };
//     hasRole: Boolean;
//     roleId: String;
//   };
// }

declare global {
  namespace Express {
    interface Request {
      token: {
        email: string;
        id: string;
        iat: Number;
        exp: Number;
      };
      hasRole: Boolean;
      roleId: string;
    }
  }
}
