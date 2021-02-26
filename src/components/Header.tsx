import React, { FC } from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const Header: FC = () => {
  const [user] = useAuthState(auth);
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          onClick={() => auth.signOut()}
          src={user?.photoURL}
          alt={user?.displayName}
        />
        <AccessTimeIcon />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input placeholder='search' /> {/* TODO */}
      </HeaderSearch>
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: not-allowed;
  user-select: none;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
  @media (max-width: 768px) {
    margin-left: 10px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: flex-end;
  cursor: not-allowed;
  user-select: none;

  > .MuiSVgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

const HeaderSearch = styled.div`
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  padding: 0 50px;
  color: gray;
  border: 1px solid gray;

  cursor: not-allowed;
  user-select: none;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;

    cursor: not-allowed;
    user-select: none;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
