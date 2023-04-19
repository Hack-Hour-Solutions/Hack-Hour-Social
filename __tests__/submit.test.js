import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import axios from 'axios';

import Submit from '../src/components/Submit';

jest.mock('axios');

const mockedOnChange = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  onChange: () => mockedOnChange,
}));
const mockedSubmit = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  handleSubmit: () => mockedSubmit,
}));

describe('Unit testing for submit component', () => {
  describe('Text area is controlled input', () => {
    let submit;
    beforeEach(async () => {
      submit = await render(
        <Submit />
      );
    });
    it('should initialize with empty string', () => {
      expect(submit.getByRole('textbox')).toHaveValue('');
    })
    it('should update state when changed', async () => {
      const input = await submit.getByRole('textbox');
      userEvent.type(input, 'test input');
      expect(mockedOnChange).toHaveBeenCalledWith('test input');
      expect(input).toHaveValue('test input');
    });
  });

  describe('Button sends correct information', () => {
    beforeAll(async () => {
      await render(
        <Submit />
      );
    });
    it('should fire an event on click', () => {

    });
    it('should send the value of the text area', () => {

    });
  });
});