import { FC, useEffect, ComponentType } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../reducers/appSlice';
import { db } from '../config/firebase';

interface Props {
  title: string;
  id?: string;
  Icon?: ComponentType;
  addChannelOption?: boolean;
  defaultRoomId?: string;
}

const SideBarOption: FC<Props> = ({
  Icon,
  title,
  addChannelOption,
  id,
  defaultRoomId,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    selectChannel(defaultRoomId);
  }, [defaultRoomId]);

  const addChannel = (): void => {
    if (addChannelOption) {
      const channelName: string | null = prompt(
        'Please enter the channel name'
      );
      if (channelName) {
        db.collection('rooms').add({
          name: channelName,
        });
      }
    }
  };

  const selectChannel = (roomId: string | undefined): void => {
    if (roomId) {
      dispatch(
        enterRoom({
          roomId,
        })
      );
    }
  };

  return (
    <SideBarOptionContainer
      onClick={() => (addChannelOption ? addChannel() : selectChannel(id))}
    >
      {Icon ? (
        <>
          <SideBarIcon>
            <Icon />
          </SideBarIcon>
          <h3>{title}</h3>
        </>
      ) : (
        <SideBarOptionChannel>
          <span>#</span> {title}
        </SideBarOptionChannel>
      )}
    </SideBarOptionContainer>
  );
};

export default SideBarOption;

const SideBarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  width: 100%;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  > h3 > span {
    padding: 15px;
  }
  @media (max-width: 768px) {
    width: 100px;
  }
`;

const SideBarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;

const SideBarIcon = styled.div`
  > .MuiSvgIcon-root {
    font-size: small;
    padding: 10px;
  }
`;
