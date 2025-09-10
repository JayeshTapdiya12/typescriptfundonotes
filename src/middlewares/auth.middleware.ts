/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface UserDetails {
  user_id: string;
  username: string;
  email: string;
}

export const userAuth = (secretKey: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken)
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        };
      bearerToken = bearerToken.split(' ')[1];

      let userDetails = jwt.verify(bearerToken, secretKey) as JwtPayload &
        UserDetails;

      req.body.createdBy = userDetails.user_id;
      req.body.username = userDetails.username;
      req.body.Email = userDetails.email;
      next();
    } catch (error) {
      if (error instanceof Error) {
        return next({
          code: HttpStatus.UNAUTHORIZED,
          message: 'Invalid or expired token',
          error: error.message
        });
      }
      return next(error);
    }
  };
};
