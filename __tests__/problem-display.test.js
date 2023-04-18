/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ProblemDisplay from '../src/components/ProblemDisplay';

describe('Title', () => {
  let display;
  const props = {
    title: 'Two Sum',
    link: 'https://leetcode.com/problems/two-sum/',
    difficulty: 'Easy'
  }

  beforeAll(() => {
    display = render(<ProblemDisplay {...props} />)
  })

  it('Renders a header', () => {
    expect(display.getByRole('heading')).toHaveTextContent('Today\'s Hack Hour');
  })

  // it('Renders title, link, and difficulty level of the problem', () => {
  //   expect(display.getByText('Title:')).toHaveStyle('font-weight: bold');
  //   expect(display.getByText('Title:').nextSibling).toHaveTextContent('Two Sum');
  //   expect(display.getByText('Link:')).toHaveStyle('font-weight: bold');
  //   expect(display.getByRole('link')).toHaveAttribute('href', 'https://leetcode.com/problems/two-sum/');
  //   expect(display.getByText('Difficulty:')).toHaveStyle('font-weight: bold');
  //   expect(display.getByText('Difficulty:').nextSibling).toHaveTextContent('Easy');
  // })
})