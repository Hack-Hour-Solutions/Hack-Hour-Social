import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Alert from './Alert';

interface decodedJWT {
  aud: string,
  azp: string,
  email: string,
  email_verified: boolean,
  exp: number,
  family_name: string,
  given_name: string,
  iat: number,
  iss: string,
  jti: string,
  name: string,
  nbf: number,
  picture: string,
  sub: string,
}

const Login = (props: any) => {
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState<boolean>(false);

  const loginSuccess = async (response: any) => {
    try {
      // TODO - Adjust for correct backend communication
      console.log('JWT is: ', response.credential);
      const loginResponse = await axios.post('api/login', {}, {
        headers: {"Authorization": `Bearer ${response.credential}`}
      })
      const { name, email, picture, id } = loginResponse.data;
      console.log('response from login is:', loginResponse.data);
      if (response.status === 200){
        props.setUser({ name, email, picture, id });
        navigate('/app')
      }
    } catch (e: unknown) {
      if (e instanceof Error) console.log('error in login success: ', e.message);
    }
  }

  return (
    <div className="login-container">
      <h1>Hack Hour Social</h1>
      {
        loginFailed && 
        <Alert message="Could not sign you in. Please try again." />
      }
      <p>Sign in</p>
      <GoogleOAuthProvider clientId={process.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
        <GoogleLogin
          onSuccess={loginSuccess}
          onError={() => setLoginFailed(true)}
          size="large"
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
