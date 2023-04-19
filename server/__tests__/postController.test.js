/**
 * @jest-environment node
 */

import { postController } from '../controllers/postController'
import { NextFunction, Request, Response } from 'express';
import { Post } from '../models'
import mongoose from 'mongoose';

let req = {};
let res = { locals: {} };
let next = jest.fn();

const mockFeed = {
  comments: [],
  _id: '643f5625690730999c94a3fb',
  solution: 'test-solution',
  date: '2023-04-19T02:32:56.261Z',
  user_id: '643f5625690730999c94a3fb'
}

const mockPost = {
  user_id: '643f5625690730999c94a3fb',
  solution: 'test-solution-post',
}

describe('postController', () => {
  
  afterAll(async () => {
    await mongoose.disconnect();
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
  
  it ('side test: does database connection work', async () => {
    const response = await Post.findOne({_id: '643f269c690730999c94a3f7'})
    const data = response;
    expect(data.solution).toBe('test-solution')
  })
  
  describe('getSolutions', () => {
    it ('Retrieves mock data via Post model and adds to res.locals ', async () => {
      //Arrange
      jest.spyOn(Post, 'find')
        .mockImplementation(() => Promise.resolve([mockFeed]))
      //Act
      await postController.getSolutions(req, res, next);
      //Assert
      expect(res.locals.solutions[0].solution).toBe('test-solution');
      expect(res.locals.solutions[0].date).toBe('2023-04-19T02:32:56.261Z')
      expect(res.locals.solutions[0].user_id).toBe('643f5625690730999c94a3fb');
      expect(next).toBeCalledTimes(1);
    })
  })

  describe('postSolution', () => {
    it ('Adds good post to mock database', async () => {
      const spy = jest.spyOn(Post, 'create').mockImplementation(() => Promise.resolve())
      req.body = mockPost;

      await postController.postSolution(req, res, next);

      expect(spy.mock.calls[0][0].solution).toBe(mockPost.solution);
      expect(spy.mock.calls[0][0].user_id).toBe(mockPost.user_id);
      expect(spy.mock.calls[0][0]).toHaveProperty('date');
      expect(next).toBeCalledTimes(1);
    })

  })
})

