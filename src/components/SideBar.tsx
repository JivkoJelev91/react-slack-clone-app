import React, { FC, useState } from 'react';
import styled from 'styled-components';
import SideBarOption from './SideBarOption';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';

const SideBar: FC = () => {
  const [expand, setExpand] = useState<boolean>(true);
  const [channels] = useCollection(db.collection('rooms'));
  const [user] = useAuthState(auth);

  return (
    <SideBarContainer>
      <SideBarHeader>
        <SideBarInfo>
          <h3>
            <FiberManualRecordIcon />
            {user.displayName}
          </h3>
        </SideBarInfo>
      </SideBarHeader>
      <SideBarExpand expand={expand}>
        <SideBarOption Icon={InsertCommentIcon} title='Threads' />
        <SideBarOption Icon={InboxIcon} title='Mentions & reactions' />
        <SideBarOption Icon={DraftsIcon} title='Saved items' />
        <SideBarOption Icon={BookmarkBorderIcon} title='Channel browser' />
        <SideBarOption Icon={PeopleAltIcon} title='People & user groups' />
        <SideBarOption Icon={AppsIcon} title='Apps' />
        <SideBarOption Icon={FileCopyIcon} title='Files browser' />
      </SideBarExpand>
      <div onClick={() => setExpand(!expand)}>
        <SideBarOption
          Icon={expand ? ExpandLessIcon : ExpandMoreIcon}
          title={`Show ${expand ? 'less' : 'more'}`}
        />
      </div>
      <hr />
      <SideBarOption Icon={ExpandMoreIcon} title='Channels' />
      <hr />
      <SideBarOption Icon={AddIcon} title='Add channel' addChannelOption />

      {channels?.docs.map((doc) => (
        <SideBarOption
          key={doc.id}
          id={doc.id}
          title={doc.data().name}
          defaultRoomId={channels?.docs[ 0 ]?.id}
        />
      ))}
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SideBarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SideBarInfo = styled.div`
  flex: 1;

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;

const SideBarExpand = styled.div<{ expand: boolean }>`
  opacity: ${(props) => (props.expand ? '1' : '0')};
  max-height: ${(props) => (props.expand ? '100%' : '0')};
  height: auto;
  overflow: hidden;
  transition: all 0.5s;
  -moz-transition: all 0.4s; /* Firefox 4 */
  -webkit-transition: all 0.4s; /* Safari and Chrome */
  -o-transition: all 0.4s; /* Opera */
  -ms-transition: all 0.4s; /* Explorer 10 */

  > *:hover {
    cursor: not-allowed;
    user-select: none;
  }
`;
