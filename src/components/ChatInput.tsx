import React, { FC, MutableRefObject, useState } from 'react';
import styled from 'styled-components';
import { db, auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@material-ui/core';
import firebase from 'firebase';

interface Props {
  channelName?: string;
  channelId?: string;
  chatRef?: MutableRefObject<HTMLDivElement | null>;
}

const ChatInput: FC<Props> = ({ channelName, channelId, chatRef }) => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState<string>('');

  const sendMessage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    if (!channelId) return;

    db.collection('rooms').doc(channelId).collection('messages').add({
      message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });

    setMessage('');
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type='submit' onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;

    @media (max-width: 768px) {
      bottom: 10px;
      width: 50%;
      padding: 15px;
    }
  }

  > form > button {
    display: none !important;
  }
`;
