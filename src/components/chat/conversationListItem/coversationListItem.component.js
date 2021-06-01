import React, {useEffect} from 'react';
import shave from 'shave';
import AuthService from "../../../services/auth.service";
import { Nav } from "react-bootstrap";
import './ConversationListItem.css';
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";

export default function ConversationListItem(props) {
    useEffect(() => {
        shave('.conversation-snippet', 20);
    })

    const name = props.data.name;
    const text = props.data.text;
    const color = props.data.color;
    const friend = props.friend;
    const setFriend = props.setter;
    const currentUser = AuthService.getCurrentUser();
    const username = currentUser.user.username;
    console.log(currentUser.user.username, name);

    const getMessageList = (friend) => {
        // window.location.href = '/messenger';
        setFriend(friend);
    }

    return (
        <div className="conversation-list-item" onClick={()=>getMessageList(name)}>
            <Avatar aria-label="post" className="avatar" style={{backgroundColor:color}}/>
            <div className="conversation-info" style={{margin: "auto auto auto 3%"}}>
                {/*<Link onClick={()=>getMessageList(name)} className="conversation-title" href={"/messenger/chatHistory/?user=" + username + "&friend="+name}>{name}</Link>*/}
                <h1 className="conversation-title">{ name }</h1>
                <p className="conversation-snippet">{ text }</p>
            </div>
        </div>
    );
}