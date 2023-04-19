/**
 * @jest-environment node
 */

import { describe, expect, it } from '@jest/globals';
import { createErr } from '../controllers.ts';

describe('createErr helper', () => {
  const testCreateErrorInput = {
    method: 'jestTestMethod',
    type: 'testError',
    err: new Error('test error'),
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

  it('should create an error object', () => {
    const testErr = createErr(testCreateErrorInput);
    expect(testErr).toHaveProperty('log');
    expect(testErr).toHaveProperty('status', testErrorAssertion.status);
    expect(testErr).toHaveProperty('message', testErrorAssertion.message);
  });

  it('should create an error object with a status code', () => {
    testCreateErrorInput.status = 400;
    const testErr = createErr(testCreateErrorInput);
    expect(testErr.status).toBe(400);
  });
});
