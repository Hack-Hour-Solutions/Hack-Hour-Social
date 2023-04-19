import { Request, Response, NextFunction } from 'express';
import { createErr } from '../utils';
import jwt from 'jsonwebtoken';

export const userController = {
  authenticateToken: (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
      return res
        .status(401)
        .json({ error: "Missing JWT token from the 'Authorization' header" });

    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err: any, user: any) => {
        if (err)
          return next(
            createErr({
              method: 'authenticateToken',
              type: 'authenticateToken error',
              err,
            })
          );
        console.log(user);
        res.locals.user = user;
        return next();
      }
    );
  },

  getUserData: (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (err:any) {
      return next(
        createErr({
          method: 'getUserData',
          type: 'getUserData error',
          err,
        })
      );
    }
  },
};
