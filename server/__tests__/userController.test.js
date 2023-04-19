/**
 * @jest-environment node
 */

import { describe, expect, it } from '@jest/globals';
import { userController } from '../controllers/userController';
import { User } from '../models';

describe('userController', () => {
  const mockRequest = (authHeader, sessionData) => ({
    get(name) {
      if (name === 'authorization') return authHeader;
      return null;
    },
    session: { data: sessionData },
  });

  const mockResponse = (locals) => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.locals = locals;
    return res;
  };

  const mockNext = jest.fn();

  describe('authenticateToken', () => {


    const expectedResponse = {
      error: "Missing JWT token from the 'Authorization' header",
    };

    it('should return an error when there are no headers', async () => {
      const req = mockRequest();
      const res = mockResponse();
      await userController.authenticateToken(req, res, mockNext);
      expect(res.status).toBeCalledWith(401);
      expect(res.json).toBeCalledWith(expectedResponse);
    });

    it('should return next() with "authorization" header', async () => {
      const req = mockRequest('Bearer JWOT');
      const res = mockResponse();
      await userController.authenticateToken(req, res, mockNext);
      expect(mockNext).toBeCalledTimes(1);
    });
  });

  describe('getUserData', () => {
    const mockUser = {
      name: 'Bob',
      email: 'bob@email.com',
      picture: 'picURL'
    }

    const mockUserWithID = Object.assign({_id: 'testID'}, mockUser)

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should return name, picture, email, and new id', async () => {
      const res = mockResponse({user: mockUser});
      const req = mockRequest();
      const spy = jest.spyOn(User, 'findOneAndUpdate')
        .mockImplementation(() => Promise.resolve(mockUserWithID))

      await userController.getUserID(req, res, mockNext)

      expect(res.locals.user).toBe(mockUserWithID)
    });
  });

  // describe verifyData: name, picture, email middleware

  describe('login', () => {
    it.todo('should return user_id from db?');
  });
});
