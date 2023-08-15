export interface IUser {
  name: string;
  email: string;
  password: string;
  role: IRole;
}

export interface IRole {
  roleName: string;
  permission: IPermission[];
}

export interface IPermission {
  permission: string;
  service: string;
}

export interface IBlog {
  title: string;
  slug: string;
  body: string;
  imgUrl: string;
  category: ICategory[];
  user: IUser;
  deleted: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  name: string;
  description: string;
}

export interface IComment {
  comment: string;
  user: IUser;
  blog: IBlog;
  createAt: Date;
  updatedAt: Date;
}
