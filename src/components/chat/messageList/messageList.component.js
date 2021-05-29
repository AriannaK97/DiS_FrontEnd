import React, {useEffect, useState} from 'react';
import Compose from '../compose/compose.component';
import Toolbar from '../toolbar/toolbar.component';
import ToolbarButton from '../toolbarButton/toolbarButton.component';
import Message from '../message/message.component';
import moment from 'moment';
import MessageService from "../../../services/message.service"
import './MessageList.css';
import AuthService from "../../../services/auth.service";


export default function MessageList(props) {
    const [messages, setMessages] = useState([])
    const user = AuthService.getCurrentUser();
    const [username] = useState(user.user.username)
    const friend = props.data;
    const setFriend = props.setter;
    console.log(props.data, username);

    useEffect(() => {
        getMessages(username, friend);
    },[friend])


    const getMessages = (username, currentFriend) => {
        console.log(username, currentFriend)
        MessageService.getMessage(username, currentFriend).then(tempMessages => {
            setMessages([...messages, ...tempMessages.data])
            console.log(messages);
            console.log(tempMessages);
        })
    }

    const renderMessages = () => {
        let i = 0;
        let messageCount = messages.length;
        let tempMessages = [];

        while (i < messageCount) {
            let previous = messages[i - 1];
            let current = messages[i];
            let next = messages[i + 1];
            let isMine = current.sender === username;
            let currentMoment = moment(current.timestamp);
            let prevBySameAuthor = false;
            let nextBySameAuthor = false;
            let startsSequence = true;
            let endsSequence = true;
            let showTimestamp = true;

            if (previous) {
                let previousMoment = moment(previous.timestamp);
                let previousDuration = moment.duration(currentMoment.diff(previousMoment));
                prevBySameAuthor = previous.sender === current.sender;

                if (prevBySameAuthor && previousDuration.as('hours') < 1) {
                    startsSequence = false;
                }

                if (previousDuration.as('hours') < 1) {
                    showTimestamp = false;
                }
            }

            if (next) {
                let nextMoment = moment(next.timestamp);
                let nextDuration = moment.duration(nextMoment.diff(currentMoment));
                nextBySameAuthor = next.sender === current.sender;

                if (nextBySameAuthor && nextDuration.as('hours') < 1) {
                    endsSequence = false;
                }
            }

            tempMessages.push(
                <Message
                    key={i}
                    isMine={isMine}
                    startsSequence={startsSequence}
                    endsSequence={endsSequence}
                    showTimestamp={showTimestamp}
                    data={current}
                    sender={username}
                    recipient={friend}
                />
            );

            // Proceed to the next message.
            i += 1;
        }

        return tempMessages;
    }

    return(
        <div className="message-list">
            <Toolbar
                style={{backgroundColor: '#6e419a'}}
                title={friend}
                rightItems={[
                    <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
                    <ToolbarButton key="video" icon="ion-ios-videocam" />,
                    <ToolbarButton key="phone" icon="ion-ios-call" />
                ]}
            />

            <div className="message-list-container">{renderMessages()}</div>

            <Compose sender={username} recipient={friend} rightItems={[
                <ToolbarButton key="photo" icon="ion-ios-camera" />,
                <ToolbarButton key="emoji" icon="ion-ios-happy" />

            ]}/>
        </div>
    );
}