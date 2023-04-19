import React, { FC, ReactElement } from "react";
import { userState } from "../types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";

type NavBarProps = {
  user: null | userState,
  setUser: React.Dispatch<React.SetStateAction<null | userState>>
}

const NavBar: FC<NavBarProps> = ({ user, setUser }): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  const logout = (): void => {
    // let success: boolean = false;
    // delete session
    // axios
    //   .delete('/api/session', {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then(res => {
    //     success = res.status === 200 ? true : false;
    //   })

    // if (success) {
      // set user state to null
      setUser(null);
      // navigate back to the login page
      navigate('/login');
    // }
  }

  return (
    <nav>
      <ul>
        <li>
          <img src={user.picture} />
          {user.name}
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
};

export default NavBar;