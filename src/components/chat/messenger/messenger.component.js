import React, {useState} from 'react';
import ConversationList from '../conversationList/ConversationList.component';
import MessageList from '../messageList/messageList.component';
import './Messenger.css';
import Toolbar from "../toolbar/toolbar.component";
import ToolbarButton from "../toolbarButton/toolbarButton.component";
import iosCog from '@iconify-icons/ion/ios-cog';
import iosAddCircleOutline from '@iconify-icons/ion/ios-add-circle-outline';

export default function Messenger(props) {
    const [friend, setFriend] = useState(null);
    return (
        <div className="messenger">
            <div className={"bottomChatList"}>
             <Toolbar
                  title="Messenger"
                  leftItems={[
                    <ToolbarButton key="cog" icon={iosCog} />
                  ]}
                  rightItems={[
                    <ToolbarButton key="add" icon={iosAddCircleOutline} />
                  ]}
            />
            </div>
             <Toolbar
                  title="Conversation Title"
                  rightItems={[
                    <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
                    <ToolbarButton key="video" icon="ion-ios-videocam" />,
                    <ToolbarButton key="phone" icon="ion-ios-call" />
                  ]}
            />

            <div className="scrollable sidebar" style={{backgroundColor: "#d6c8dc"}}>
                <ConversationList data={friend} setter={setFriend}/>
            </div>

            <div className="scrollable content">
                <MessageList data={friend} setter={setFriend}/>
            </div>
        </div>
    );
}