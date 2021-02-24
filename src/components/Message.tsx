import React, { FC } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';

interface TimestampState {
  seconds: number;
  nanoseconds: number;
}

interface Props {
  message: string;
  timestamp: TimestampState;
  user: string;
  userImage: string;
}

const { Timestamp } = firebase.firestore;

const convertTimestampToDate = (timestamp: TimestampState | any): Date | any =>
  timestamp instanceof Timestamp
    ? new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
    : timestamp;

const Message: FC<Props> = ({ message, timestamp, user, userImage }) => {
  const timestampDate = convertTimestampToDate(timestamp);
  return (
    <MessageContainer>
      <img src={userImage} alt='userImage' />
      <MessageInfo>
        <h4>
          {user}
          <span>
            {timestamp ? new Date(timestampDate).toUTCString() : null}
          </span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    border-radius: 8px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;
