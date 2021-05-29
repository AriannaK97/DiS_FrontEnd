import React, {useEffect} from 'react';
import shave from 'shave';

import './ConversationListItem.css';
import Avatar from "@material-ui/core/Avatar";

export default function ConversationListItem(props) {
    useEffect(() => {
        shave('.conversation-snippet', 20);
    })

    const { name, text } = props.data;
    console.log(props);

    return (
        <div className="conversation-list-item">
            <Avatar aria-label="post" className="avatar"/>
            <div className="conversation-info">
                <h1 className="conversation-title">{ name }</h1>
                <p className="conversation-snippet">{ text }</p>
            </div>
        </div>
    );
}