import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Post, User, Comment } from '../models.js'
import { createErr } from '../controllers.js';

export const postController = {

  getSolutions: function(req: Request, res: Response, next: NextFunction) {
    const todayMidnight = new Date().setHours(0, 0, 0, 0);
    // REWORK TO BE TO PST TIME INSTEAD OF UTC
    Post.find({date: {$gte: todayMidnight}})
      .then(response => {
        res.locals.solutions = response;
        return next();
      })
      .catch((err) => next(
        createErr({
          method: 'getSolutions',
          type: 'MongoDB Error',
          err: err
        }))
      )
  },

  postSolution: function(req: Request, res: Response, next: NextFunction) {

    Post.create({
      user_id: req.body.user_id,
      solution: req.body.solution,
      date: new Date(),
    })
      .then(response => {
        res.locals.post = response;
        return next();
      })
      .catch((err) => next(
        createErr({
          method: 'postSolution',
          type: 'MongoDB Error',
          err: err
        }))
      )
  }
}