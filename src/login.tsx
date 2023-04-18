import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

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
    console.log('response from success is: ', response);
    // Decode JWT sent from google oauth api
    const userDetails: decodedJWT = jwt_decode(response.credential);
    console.log('decoded JWT is: ', userDetails);
    // destructure desired user info
    const { name, email, picture } = userDetails;
    try {
      const serverResponse = await fetch('/api', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, picture })
      });
      if (response.status === 200){
        props.setUser({ name, email, picture, id: response.data});
        navigate('/app')
      }
    } catch (e: unknown) {
      if (e instanceof Error) console.log('error in login success: ', e.message);
    }
  }

  return (
    <div className="login-container">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
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
