import React, {useState} from 'react';
import './Compose.css';
import MessageService from "../../../services/message.service"
import {TextField} from "@material-ui/core";

export default function Compose(props) {

    const [message, setMessage] = useState();
    const recipient = props.recipient;
    const sender = props.sender;

    const placeholderStr = "Type a message, @" + recipient;

    function refreshPage() {
        window.location.reload(true);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            MessageService.postMessage(message, sender, recipient).then(response => response.status);
            console.log(message, sender, recipient)
            console.log('do validate');
            setMessage(null);
            refreshPage();
        }
    }

    const renderForm = () => {
        if(recipient !== null){
            return(
                <div className="compose">
                    <TextField
                        type="text"
                        className="compose-input"
                        placeholder={placeholderStr}
                        onKeyPress={handleKeyDown}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />

                    {
                        props.rightItems
                    }
                </div>
            )
        }else{
            return(
                <div className="compose"><h9>Please select a conversation...</h9></div>
            )
        }
    }

    return (
        renderForm()
    )
}