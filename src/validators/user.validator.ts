import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class UserValidator {
  public newUser = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      fname: Joi.string().min(1).required(),
      lname: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9@]{3,30}$'))
        .required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };
}

export default UserValidator;
