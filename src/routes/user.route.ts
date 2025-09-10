import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

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
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
