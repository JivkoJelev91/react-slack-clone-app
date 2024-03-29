import { FC, useState, SyntheticEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import SendIcon from '@material-ui/icons/Send';
import OpenAiIcon from '../resources/openAIimage.png';

import { db, auth } from '../config/firebase';
import { getAnswer } from '../requests/openApiRequest';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useScrollToBottom } from 'react-scroll-to-bottom';

interface Props {
  channelName?: string;
  channelId?: string;
}

const chatBotRoomAvailable = 'OPENAI';

const ChatInput: FC<Props> = ({ channelName, channelId }) => {
  const [user] = useAuthState(auth);
  const isOpenAIroom = channelName === chatBotRoomAvailable;
  const [message, setMessage] = useState<string>('');
  const scrollToBottom = useScrollToBottom();

  const sendMessage = (e: SyntheticEvent): void => {
    e.preventDefault();

    if (!channelId || !message) return;

    db.collection('rooms').doc(channelId).collection('messages').add({
      message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });

    scrollToBottom();
    setMessage('');
  };

  const onKeyDown = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      sendMessage(e);

      if(isOpenAIroom){
        const response = await getAnswer(message);

        db.collection('rooms').doc(channelId).collection('messages').add({
          message: response,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: 'ChatGPT',
          userImage: OpenAiIcon,
        });
      }
    }
  };

  return (
    <ChatInputContainer>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`Message #${channelName}`}
        onKeyDown={onKeyDown}
        autoFocus
      />
      <SendIcon onClick={sendMessage} />
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;

  > .MuiSvgIcon-root {
    color: #1976d2;
    position: absolute;
    right: 15px;
    cursor: pointer;
  }

  > input {
    width: 100%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 15px 20px;
    outline: none;

    @media (max-width: 768px) {
      bottom: 10px;
      padding: 15px;
    }
  }
`;
