import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// import Login from '../src/components/login';
import Alert from '../src/components/Alert';

describe('Unit testing login components', () => {
  describe('Alert Bar Text', () => {
    let alertBar;
    const props = {
      message: 'test message'
    }
    beforeAll(() => {
      alertBar = render(<Alert {...props} />);
    });
    test('Alert bar renders correctly', () => {
      expect(alertBar.getByText('Error!')).toHaveStyle('font-weight: bold');
      expect(alertBar.getByText('Error!').nextSibling).toHaveTextContent('test message');
    })
  })
  // TODO - fix import.meta issue preventing login failure alert testing

  // describe('Login Failure', () => {
  //   let login;
  //   beforeAll(() => {
  //     login = render(<Login/>);
  //     login.setState({loginFailed: true});
  //   })
  //   test('Failed login renders error bar', () => {
  //     expect(login.getByText('Error!').toHaveStyle('font-weight: bold'));
  //     expect(login.getByText('Error!').nextSibling).toHaveTextContent('Could not sign you in. Please try again.');
  //   })
  // })
})