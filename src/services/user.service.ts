import User from '../models/user.model';
import {
  IUser,
  IUserError,
  ILoginResponse,
  IUserSignup
} from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class UserService {
  //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await User.find();
    return data;
  };

  //create new user
  public newUser = async (
    body: IUser
  ): Promise<IUser | IUserError | ILoginResponse | IUserSignup> => {
    try {
      const data = await User.findOne({ email: body.email });

      if (!data) {
        const saltround = 10;
        const hashPassword = await bcrypt.hash(body.password, saltround);
        body.password = hashPassword;

        await User.create(body);
        return {
          code: 200,
          success: true,
          message: 'User email is created'
        };
      } else {
        return {
          code: 200,
          success: false,
          message: 'User email already exists!'
        };
      }
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: 'An error occurred while signing up the user.'
      };
    }
  };

  public login = async (
    body: IUser
  ): Promise<IUser | IUserError | ILoginResponse> => {
    try {
      const data = await User.findOne({ email: body.email });
      if (!data) {
        return {
          code: 404,
          message: 'the email is not found',
          success: false
        };
      } else {
        const password_isvalid = await bcrypt.compare(
          body.password,
          data.password
        );

        if (password_isvalid) {
          const token = await jwt.sign(
            { email: data.email, user_id: data._id, username: data.fname },
            process.env.jwt_sceret_key
          );
          return {
            code: 200,
            data: {
              token: token,
              name: data.fname,
              email: data.email
            },
            success: true,
            message: 'user login succesfully!'
          };
        } else {
          return {
            code: 404,
            message: 'the password is wrong',
            success: false
          };
        }
      }
    } catch (error) {
      return {
        code: 500,
        message: 'Internal server error',
        error: error.message,
        success: false
      };
    }
  };
}

export default UserService;
