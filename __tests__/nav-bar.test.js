import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import NavBar from '../src/components/NavBar';

// UI tests
describe('NavBar', () => {
  const props = {
    user: {
      name: 'Bob',
      email: 'sponge@bob.com',
      picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png',
      id: 4
    },
    setUser: jest.fn()
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

// logout functionality tests
// mock axios
jest.mock('axios', () => {
  return {
    ...jest.requireActual('axios'),
    delete: jest.fn(),
  };
})
jest
  .spyOn(axios, 'delete')
  .mockImplementation(
    jest.fn(() =>
      Promise.resolve({ status: 200 })
    )
  );
// mock useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('On logout', () => {
  const props = {
    user: {
      name: 'Bob',
      email: 'sponge@bob.com',
      picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/220px-SpongeBob_SquarePants_character.svg.png',
      id: 4
    },
    setUser: jest.fn()
  }

  beforeEach(async () => {
    render(
      <BrowserRouter>
        <NavBar {...props} />
      </BrowserRouter>
    )
    const button = screen.getByRole('button');
    fireEvent.click(button);
  })

  it('Deletes the user\'s session', async () => {
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith('/api/session', { headers: { 'Content-Type': 'application/json' } });
    expect(axios.delete()).resolves.toEqual({ status: 200 });
  })

  it('Sets the userState to null', async () => {
    jest.spyOn(React, "useState");

    expect(props.setUser).toHaveBeenCalled();
    expect(props.setUser).toHaveBeenCalledWith(null);
  })

  it('Navigates the user to the login page', async () => {
    expect(mockedUsedNavigate).toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
  })
})