import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import ResetPasswordValidator from '../validators/resetpasswordvalidator';
import dotenv from 'dotenv';
dotenv.config();

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();
  private ResetPasswordValidator = new ResetPasswordValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    //route to get all users
    this.router.get('/', this.UserController.getAllUsers);

    //route to create a new user
    this.router.post(
      '/sign',
      this.UserValidator.newUser,
      this.UserController.newUser
    );

    this.router.post('/login', this.UserController.login);

    this.router.post(
      '/forget_password',
      userAuth(process.env.jwt_sceret_key),
      this.UserController.forgetpassword
    );

    this.router.post(
      '/reser_password',
      userAuth(process.env.jwt_sceret_key),
      this.ResetPasswordValidator.newPassword,
      this.UserController.resetPassword
    );
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
