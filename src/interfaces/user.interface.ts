import { Document } from 'mongoose';

export interface IUser extends Document {
  // _id: string | number;

  fname?: string;
  lname?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUserError {
  code: number;
  message: string;
  success: boolean;
  error?: string;
}

export interface ILoginResponse {
  code: number;
  data: {
    token: string;
    name: string;
    email: string;
  };
  success: boolean;
  message: string;
}

export interface IUserSignup {
  code: number;
  success: string;
  message: string;
}
