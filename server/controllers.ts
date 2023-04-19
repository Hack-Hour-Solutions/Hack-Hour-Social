import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Post, User, Comment } from './models.js'
import axios from "axios";

type controllerType = {
  getSolutions: RequestHandler;
}

export const dbController: controllerType = {

  getSolutions: function(req: Request, res: Response, next: NextFunction) {
    const todayMidnight = new Date().setHours(0, 0, 0, 0);
    // REWORK TO BE TO PST TIME INSTEAD OF UTC
    Post.find({date: {$gte: todayMidnight}})
      .then(response => {
        //console.log('POST.find RESPONSE', response)
        res.locals.solutions = response;
        console.log('RES.LOCALS.SOLUTIONS', res.locals.solutions)
        return next();
      })
      .catch(err => console.log(err))
  }
}
  
// ERROR TYPE CAUSES ERROR WITH CREATE ERROR, SET TO ANY

interface createErr {
  method: string;
  type: string;
  err: any;
  status?: number;
}

export const createErr = ({ method, type, err, status }: createErr) => ({
  log: `${method}, ${type}: ${
    typeof err === "object" ? JSON.stringify(err, ["name", "message"], 2) : err
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
    const LEETCODE_API_ENDPOINT = "https://leetcode.com/graphql";
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
      console.log("inside error");
      return next(
        createErr({
          method: "getProblemOfTheDay",
          type: "leetcode problem error",
          err: err
        })
      );
    }
  },
};