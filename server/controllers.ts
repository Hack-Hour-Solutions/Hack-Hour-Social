import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';

interface createErr {
  method: string;
  type: string;
  err: Error;
  status?: number;
}

export const createErr = ({ method, type, err, status }: createErr) => ({
  log: `${method}, ${type}: ${
    typeof err === 'object' ? JSON.stringify(err, ['name', 'message'], 2) : err
  }`,
  status: status ? status : 500,
  message: {
    err: `Error occurred in ${method}. check server logs for more details`,
  },
});

export const leetcodeController = {
  getProblemOfTheDay: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';
    const DAILY_CODING_CHALLENGE_QUERY = `
      query questionOfToday {
      	activeDailyCodingChallengeQuestion {
      		date
      		userStatus
      		link
      		question {
      			acRate
      			difficulty
      			freqBar
      			frontendQuestionId: questionFrontendId
      			isFavor
      			paidOnly: isPaidOnly
      			status
      			title
      			titleSlug
      			hasVideoSolution
      			hasSolution
      			topicTags {
      				name
      				id
      				slug
      			}
      		}
      	}
      }`;

    try {
      console.log(`Fetching daily coding challenge from LeetCode API.`);
      const { data } = await axios.post(LEETCODE_API_ENDPOINT, {
        query: DAILY_CODING_CHALLENGE_QUERY,
      });

      const { link, question } = data.activeDailyCodingChallengeQuestion;
      const { title, difficulty } = question;

      res.locals.dailyProblem = { title, difficulty, link };
      // console.log(res.locals.dailyProblem);
      return next();
    } catch (err) {
      console.log('inside error');
      return next(
        createErr({
          method: 'getProblemOfTheDay',
          type: 'leetcode problem error',
          err,
        })
      );
    }
  },
};

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
    } catch (err) {
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
