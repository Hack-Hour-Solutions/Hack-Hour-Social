import { Request, Response, NextFunction } from 'express';
import { createErr } from '../utils';
import axios from 'axios';

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
      //console.log(`Fetching daily coding challenge from LeetCode API.`);
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
