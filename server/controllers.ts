import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Post, User, Comment } from './models'

type controllerType = {
  getSolutions: RequestHandler;

}

const controller: controllerType = {

  getSolutions: function(req: Request, res: Response, next: NextFunction) {
    const today = new Date();
    console.log(new Date());
   // Post.find()
    
  }



}; 

export { controller };