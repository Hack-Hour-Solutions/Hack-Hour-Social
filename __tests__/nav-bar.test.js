import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import NavBar from '../src/components/NavBar';

describe('NavBar', () => {
  const props = {
    name: 'Bob',
    picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png'
  }

  beforeEach(() => {
    render(<NavBar {...props} />)
  })

  it('Renders the user\'s picture and name', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  }) 

  it('Renders a logout button', () => {
    expect(screen.getByRole('button')).toHaveTextContent('Logout');
  })
})