import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import App from '../src/components/App'; 
import { BrowserRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');
const mockUser = { 
  status: 200, 
  data: { 
    loggedIn: true, 
    user: 'testuser', 
    email: 'test@user.com', 
    picture: 'test.jpeg', 
    id: 7 
  }
};

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Unit testing session verification', () => {
  let app;
  let valid;
  jest.spyOn(axios, 'get').mockImplementation(() => {
    if (valid === true) return mockUser;
    else return {status: 401}
  });
  describe('On valid session', () => {
    beforeAll(async () => {
      valid = true;
      await act( async() => {
        app = await render(        
          <BrowserRouter>
            <App />
          </BrowserRouter>
        );
      });
    });
    it('should redirect to /app', async () => {
      expect(mockedUsedNavigate).toHaveBeenCalled();
      expect(mockedUsedNavigate).toHaveBeenCalledWith('app');
    });
  });
  describe('on invalid session', () => {
    beforeAll(async () => {
      valid = false;
      await act( async() => {
        app = await render(        
          <BrowserRouter>
            <App />
          </BrowserRouter>
        );
      });
    });

    it('should redirect to /login', () => {
      expect(mockedUsedNavigate).toHaveBeenCalled();
      expect(mockedUsedNavigate).toHaveBeenCalledWith('login');
    });
  });
});