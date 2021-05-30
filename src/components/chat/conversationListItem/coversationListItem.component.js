import React, {useEffect} from 'react';
import shave from 'shave';
import AuthService from "../../../services/auth.service";

import './ConversationListItem.css';
import Avatar from "@material-ui/core/Avatar";

export default function ConversationListItem(props) {
    useEffect(() => {
        shave('.conversation-snippet', 20);
    })

    const name = props.data.name;
    const text = props.data.text;
    const setFriend = props.setter;
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser.user.username, name);

    const getMessageList = (friend) => {
        console.log(friend)
        setFriend(friend);
    }

    return (
        <div className="conversation-list-item" onClick={()=>getMessageList(name)}>
            <Avatar aria-label="post" className="avatar"/>
            <div className="conversation-info" style={{margin: "auto auto auto 3%"}}>
                <h1 className="conversation-title">{ name }</h1>
                <p className="conversation-snippet">{ text }</p>
            </div>
        </div>
    );
}