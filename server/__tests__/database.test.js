/**
 * @jest-environment node
 */

import { controller } from '../controllers'
import { NextFunction, Request, Response } from 'express';
import { Post } from '../models'
import mongoose from 'mongoose';

let req = {};
let res = { locals: {} };
let next = jest.fn();

describe('post.controller connects to database and retrieves posts', () => {
  let data;
  
  afterAll(async () => {
    await mongoose.disconnect();
  })
  
  it ('controller.getSolutions retrieves solutions', () => {
    controller.getSolutions(req, res, next);
    expect(res.locals.solutions[0].solution).toBe('test-solution');
    expect(res.locals.solutions[0].createAt).toBe('test-date')
    expect(res.locals.solutions[0].user_id).toBe('testID');
  })
})