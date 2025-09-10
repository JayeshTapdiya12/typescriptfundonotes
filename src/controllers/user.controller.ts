/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';

import { Request, Response, NextFunction } from 'express';

import { ILoginResponse, IUserError } from '../interfaces/user.interface';

class UserController {
  public UserService = new userService();

  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getAllUsers();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All users fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  public newUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.newUser(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.login(req.body);
      if ((data as ILoginResponse).code) {
        res.status((data as ILoginResponse).code).json(data);
      } else {
        res.status((data as IUserError).code).json(data);
      }
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred during login',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
}

export default UserController;
