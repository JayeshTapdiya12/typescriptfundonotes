import User from '../models/user.model';
import {
  IUser,
  IUserError,
  ILoginResponse,
  IUserSuccess
} from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendMail } from '../utils/emailsender';
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
  ): Promise<IUser | IUserError | ILoginResponse | IUserSuccess> => {
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

  public forgetpassword = async (
    body
  ): Promise<IUser | ILoginResponse | IUserError | IUserSuccess> => {
    try {
      const data = await User.findOne({ email: body.email });
      if (!data) {
        return {
          code: 400,
          success: false,
          message: 'the email does not exist'
        };
      } else {
        const token = await jwt.sign(
          { email: data.email, userName: data.fname, userId: data._id },
          process.env.jwt_sceret_key,
          { expiresIn: '1h' }
        );

        const content = `
          <h1>Hello, ${data.fname}</h1>
          <p>Click the link below to reset your password:</p>
          <a href="http://localhost:${process.env.APP_PORT}/api/${process.env.API_VERSION}/users/forget_password/${token}">
            Reset Password
          </a>
        `;

        const subject = 'Password Reset Link';

        await sendMail({ email: data.email, subject: subject, body: content });
        return {
          code: 200,
          success: true,
          message: 'Password reset email sent successfully'
        };
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

  public resetPassword = async (
    body
  ): Promise<IUser | IUserError | IUserSuccess> => {
    try {
      const data = await User.findOne({ email: body.email });
      if (!data) {
        return {
          code: 404,
          message: 'The email is not found',
          success: false
        };
      } else {
        const saltround = 10;
        const hashPassword = await bcrypt.hash(body.password, saltround);
        data.password = hashPassword;
        await data.save();
        return {
          code: 200,
          message: 'your password is reset !!',
          success: true
        };
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
