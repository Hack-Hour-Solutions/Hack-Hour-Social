import { Request, Response, NextFunction } from 'express';
import { createErr } from '../utils.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.VITE_GOOGLE_OAUTH_CLIENT_ID);

export const userController = {
  authenticateToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      
      // tsc type checking
      if(!authHeader) throw new Error('authHeader missing');
      if(typeof authHeader !== 'string') throw new Error('authheader is not a string');
      
      // Bearer at 0 JWT at 1
      const token = authHeader.split(' ')[1];
      
      if (!token)
      return res
      .status(401)
      .json({ error: "Missing JWT token from the 'Authorization' header" });
      
      // google verification through client id https://developers.google.com/identity/sign-in/web/backend-auth
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      if(!payload) throw new Error('payload of JWT is empty');

      console.log(`payload is : inside of authenticateToken`, payload);

      res.locals.users = payload;
      return next();

    } catch (err : unknown) {
      if (err instanceof Error) {
        return next(
          createErr({
            method: 'authenticateToken',
            type: 'authenticateToken error',
            err,
          })
        );
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
