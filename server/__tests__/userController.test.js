import { describe, expect, it } from "@jest/globals";
import { userController } from "../controllers.ts";

/**
 * @jest-environment node
 */

describe("userController.getUserData", () => {
  const mockRequest = (authHeader, sessionData) => ({
    get(name) {
      if (name === "authorization") return authHeader;
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

  it("should return an error when there are no headers", async () => {
    const req = mockRequest();
    const res = mockResponse();
    await userController.getUserData(req, res, mockNext);
    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith(expectedResponse);
  });

  it.todo('should return an error when there is not an "Authorization" header');
  it.todo('should return next() with "authorization" header');
});
