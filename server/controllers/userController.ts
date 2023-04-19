import { Request, Response, NextFunction } from 'express';
import { createErr } from '../utils.js';
import jwt from 'jsonwebtoken';
import { User } from '../models.js';

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


  getUserID: (req: Request, res: Response, next: NextFunction) => {
    
    if (!(res.locals.user && 
      res.locals.user.name && 
      res.locals.email && 
      res.locals.picture)) {
        return next(
          createErr({
            method: 'getUserData',
            type: 'Missing data',
            err: 'User name, email, or picture was not passed to getUserID'
          })
        );
      }
    
    const newUser = {
      name: res.locals.user.name,
      email: res.locals.user.email,
      picture: res.locals.user.picture
    }

    User.findOneAndUpdate({email: newUser.email}, newUser, {upsert: true})
      .then(response => {
        console.log('USER CREATED/UPDATED', response)
        res.locals.user = response;
      })
      .catch((err: any) => {
        return next(
          createErr({
            method: 'getUserData',
            type: 'getUserData error',
            err,
          })
        );
      })
  },

};
