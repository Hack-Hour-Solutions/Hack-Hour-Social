import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Post, User, Comment } from './models.js';
import axios from 'axios';

type controllerType = {
  getSolutions: RequestHandler;
};

export const dbController: controllerType = {
  getSolutions: function (req: Request, res: Response, next: NextFunction) {
    const todayMidnight = new Date().setHours(0, 0, 0, 0);
    // REWORK TO BE TO PST TIME INSTEAD OF UTC
    Post.find({ date: { $gte: todayMidnight } })
      .then((response) => {
        console.log('POST.find RESPONSE', response);
        res.locals.solutions = response;
        return next();
      })
      .catch((err) => console.log(err));
  },
};

// ERROR TYPE CAUSES ERROR WITH CREATE ERROR, SET TO ANY
