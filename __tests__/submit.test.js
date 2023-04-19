import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import axios from 'axios';

import Submit from '../src/components/Submit';

jest.mock('axios');

describe('Unit testing for submit component', () => {
  describe('Text area is controlled input', () => {
    beforeAll(() => {
      submit = render(
        <Submit />
      );
    });
    it('should update state when changed', () => {
      userEvent.type(scree.getByRole('textarea'), 'test input');
      expect(screen.getByTestId('output')).toHaveTextContent('test input');
      expect(scree.getByRole('textarea')).toHaveValue('test input');
    });
  });

  describe('Button sends correct information', () => {

    it('should fire an event on click', () => {

    });
    it('should send the value of the text area', () => {

    });
  });
});