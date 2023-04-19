import { describe, expect, it } from "@jest/globals";
import { createErr, leetcodeController } from "../controllers.ts";
import axios from "axios";

/**
 * @jest-environment node
 */

describe("createErr helper", () => {
  const testCreateErrorInput = {
    method: "jestTestMethod",
    type: "testError",
    err: new Error("test error"),
  };

  const testErrorAssertion = {
    log: `jestTestMethod, testError: {
 "name": "Error",
 "message": "test error"
}`,
    status: 500,
    message: {
      err: `Error occurred in jestTestMethod. check server logs for more details`,
    },
  };

  it("should create an error object", () => {
    const testErr = createErr(testCreateErrorInput);
    expect(testErr).toEqual(testErrorAssertion);
  });

  it("should create an error object with a status code", () => {
    testCreateErrorInput.status = 400;
    const testErr = createErr(testCreateErrorInput);
    expect(testErr.status).toBe(400);
  });
});

jest.mock("axios");
const mockGraphQLData = {
  data: {
    activeDailyCodingChallengeQuestion: {
      link: "some link",
      question: {
        title: "some title",
        difficulty: "some difficulty",
      },
    },
  },
};
axios.post.mockResolvedValue(mockGraphQLData);

describe("Leetcode API Controller", () => {
  let mockRequest, mockResponse, mockNext;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = { locals: {} };
    mockNext = jest.fn();
  });

  it("should get the problem of the day from api endpoint", async () => {
    await leetcodeController.getProblemOfTheDay(
      mockRequest,
      mockResponse,
      mockNext
    );
    const { title, difficulty, link } = mockResponse.locals.dailyProblem;
    expect(title).toBe("some title");
    expect(difficulty).toBe("some difficulty");
    expect(link).toBe("some link");
  });
  it("should return a call to next after a successful axios fetch", async () => {
    await leetcodeController.getProblemOfTheDay(
      mockRequest,
      mockResponse,
      mockNext
    );
    expect(mockNext).toBeCalled();
  });

  it("should return a call to next() when an error is passed in", async () => {
    axios.post.mockResolvedValue(new Error("mockError"));
    await leetcodeController.getProblemOfTheDay(
      mockRequest,
      mockResponse,
      mockNext
    );
    expect(mockNext).toBeCalled();
  });
});
