/**
 * @jest-environment node
 */

import { dbController } from '../controllers'
import { NextFunction, Request, Response } from 'express';
import { Post } from '../models'
import mongoose from 'mongoose';

let req = {};
let res = { locals: {} };
let next = jest.fn();

const mockData = {
  comments: [],
  _id: '643f5625690730999c94a3fb',
  solution: 'hello this sucks',
  date: '2023-04-19T02:32:56.261Z'
}





describe('post.controller connects to database and retrieves posts', () => {
  
  afterAll(async () => {
    await mongoose.disconnect();
  })
  
  it ('database connection successful', async () => {
    const response = await Post.findOne({_id: '643f269c690730999c94a3f7'})
    const data = response;
    expect(data.solution).toBe('test-solution')
  })
  
  
  it ('controller.getSolutions retrieves solutions', () => {
    jest.spyOn(Post, 'find')
      .mockImplementationOnce(() => Promise.resolve([mockData]))
    dbController.getSolutions(req, res, next);
    expect(res.locals.solutions[0].solution).toBe('test-solution');
    expect(res.locals.solutions[0].date).toBe('2023-04-18T23:57:10.118Z')
    expect(res.locals.solutions[0].user_id).toBe('testID');
  })
})