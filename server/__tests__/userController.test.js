/**
 * @jest-environment node
 */

import { describe, expect, it } from '@jest/globals';
import { userController } from '../controllers.ts';

describe('userController', () => {
  describe('authenticateToken', () => {
    const mockRequest = (authHeader, sessionData) => ({
      get(name) {
        if (name === 'authorization') return authHeader;
        return null;
      },
      session: { data: sessionData },
    });

    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };

    const mockNext = jest.fn();

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
    it.todo('should return name, picture, email');
  });

  // describe verifyData: name, picture, email middleware

  describe('login', () => {
    it.todo('should return user_id from db?');
  });
});
