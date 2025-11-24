export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  role?: "user" | "admin";
}