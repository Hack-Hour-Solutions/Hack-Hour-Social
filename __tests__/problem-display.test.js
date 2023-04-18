import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ProblemDisplay from '../src/components/ProblemDisplay';

describe('Title', () => {
  const props = {
    title: 'Two Sum',
    url: 'https://leetcode.com/problems/two-sum/',
    difficulty: 'Easy'
  }

  beforeEach(() => {
    render(<ProblemDisplay {...props} />)
  })

  it('Renders a header', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Today\'s Hack Hour');
  })

  it('Renders title, link, and difficulty level of the problem', () => {
    expect(screen.getByText('Title:')).toHaveStyle('font-weight: bold');
    expect(screen.getByText('Title:').nextSibling).toHaveTextContent('Two Sum');
    expect(screen.getByText('Link:')).toHaveStyle('font-weight: bold');
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://leetcode.com/problems/two-sum/');
    expect(screen.getByText('Difficulty:')).toHaveStyle('font-weight: bold');
    expect(screen.getByText('Difficulty:').nextSibling).toHaveTextContent('Easy');
  })
});