import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';
import AlgoBoard from "./AlgoBoard";
import Login from "./Login"
import { userState } from "../types";

function App() {
  // console.log('in app')
  const [user, setUser] = useState<null | userState>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log('in useEffect')
    const checkSession = async () => {
      // console.log('in checkSession')
      try {
        // TODO - adjust to match correct routing
        const user = await axios.get('/api/session');
          // if the user is logged in, set the user 
          // and navitage directly to the app
          if (user.data?.loggedIn === true) {
            setUser({
              name: user.data.name,
              email: user.data.email,
              picture: user.data.picture,
              id: user.data.id
            });
            navigate('app');
          }
          else {
            navigate('login')
          }
      } catch (e: unknown) {
        if (e instanceof Error) console.log('error in session validation: ', e.message);
      }
    };
    if (user === null) checkSession();
    else navigate('/app')
  }, [user]);


  return (
    <>
    <Routes>
      <Route
        path='/login'
        element={
          <Login 
            setUser={(u) => setUser(u)} 
            // setUserJWT={(jwt) => setUserJWT(jwt)}
          />
        }
      />
      <Route
        path='/'
        element={<p>Redirecting...</p>}
      />
      <Route
        path='/app'
        element={<AlgoBoard user={user} />}
      />
    </Routes>
    </>
  )
}

export default App
