import React, { FC } from 'react';
import styled from 'styled-components';
import logo from '../resources/goldFish.jpg';
import { Button } from '@material-ui/core';
import { auth, provider } from '../config/firebase';

const Login: FC = () => {
  const signIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src={logo} alt='logo' />
        <h2>Sign in to the Galabovo Maika Slack</h2>
        <p>galabovo.maika.slack.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
  @media (max-width: 1024px) {
    padding: 50px;
  }
`;
