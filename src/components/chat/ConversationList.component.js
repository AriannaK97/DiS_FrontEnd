import React, {useState, useEffect} from 'react';
import ConversationSearch from './ConversationSearch.component';
import ConversationListItem from './coversationListItem.component';
import UserService from "../../services/user.service"
import axios from 'axios';

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
    useEffect(() => {
        getConversations()
    },[])

    const getConversations = () => {
        UserService.getAllUsers().then(response => {
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
        <div className="conversation-list">
            <Toolbar
                title="Messenger"
                leftItems={[
                    <ToolbarButton key="cog" icon="ion-ios-cog" />
                ]}
                rightItems={[
                    <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
                ]}
            />
            <ConversationSearch />
            {
                conversations.map(conversation =>
                    <ConversationListItem
                        key={conversation.username}
                        data={conversation}
                    />
                )
            }
        </div>
    );
}