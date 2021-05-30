import React, {useState, useEffect} from 'react';
import ConversationSearch from '../conversationSearch/ConversationSearch.component';
import ConversationListItem from '../conversationListItem/coversationListItem.component';
import MessageService from "../../../services/message.service"
import iosCog from '@iconify-icons/ion/ios-cog';
import iosAddCircleOutline from '@iconify-icons/ion/ios-add-circle-outline';

import './ConversationList.css';
import Toolbar from "@material-ui/core/Toolbar";
import * as PropTypes from "prop-types";

class ToolbarButton extends React.Component {
    render() {
        return null;
    }
}

ToolbarButton.propTypes = {icon: PropTypes.string};
export default function ConversationList(props) {
    const [conversations, setConversations] = useState([]);
    const friend = props.data;
    const setFriend = props.setter;
    const conversationListName = "Conversations"
    console.log(props.data)

    useEffect(() => {
        getConversations()
    },[]
        )

    const getConversations = () => {
        MessageService.getConversations().then(response => {
            console.log(response.data);
            let newConversations = response.data.map(result => {
                return {
                    name: `${result.username}`,
                    text: 'Hello world! This is a long message that needs to be truncated.'
                };
            });
            setConversations([...conversations, ...newConversations])
        });
    }

    return (
        <div className="conversation-list" style={{backgroundColor: "#d6c8dc"}}>
            <Toolbar style={{backgroundColor: '#6e419a', color: "whitesmoke"}}
                title={conversationListName}
                leftItems={[
                    <ToolbarButton key="cog" icon={iosCog} />
                ]}
                rightItems={[
                    <ToolbarButton key="add" icon={iosAddCircleOutline} />
                ]}
            />
            <ConversationSearch />
            {
                conversations.map(conversation =>
                    <ConversationListItem
                        key={conversation.name}
                        data={conversation}
                        friend={friend}
                        setter={setFriend}
                    />
                )
            }
        </div>
    );
}