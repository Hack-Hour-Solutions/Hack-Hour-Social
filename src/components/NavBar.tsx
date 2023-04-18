import React, { FC, ReactElement } from "react";

type NavBarProps = {
  name: string,
  picture: string
}

const NavBar: FC<NavBarProps> = ({ name, picture }): ReactElement => {
  const logout = ():void => {
    // clear user state + session/cookie data
    // navigate back to the login page
  }

  return (
    <nav>
      <ul>
        <li>
          <img src={picture} />
          {name}
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
};

export default NavBar;