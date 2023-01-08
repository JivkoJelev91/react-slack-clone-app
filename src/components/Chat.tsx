import { FC } from 'react';
import styled from 'styled-components';
import ScrollToBottom from 'react-scroll-to-bottom';

import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { ChatInput, Message } from 'components';
import { useSelector } from 'react-redux';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { selectRoomId } from '../reducers/appSlice';
import { db } from '../config/firebase';
import { css } from '@emotion/css';

const ROOT_CSS = css({
  height: 'calc(100vh - 172px)',
});

const Chat: FC = () => {
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  );
  const [roomMessages] = useCollection(
    roomId &&
      db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
  );
  const roomName = roomDetails?.data()?.name; 

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomName}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>

            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </Header>
          <ScrollToBottom>
            <ChatMessages className={ROOT_CSS}>
              {roomMessages?.docs.map((doc) => {
                const { message, timestamp, user, userImage } = doc.data();
                return (
                  <Message
                    key={doc.id}
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                  />
                );
              })}
            </ChatMessages>
          </ScrollToBottom>

          <ChatInput
            channelName={roomName}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;
