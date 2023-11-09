import React, {useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import {socket} from "../../socket.js";
import {useAuth} from "../../hooks/useAuth.js";

const ChatActions = ({onWriting, isDisabled}) => {
    const [message, setMessage] = useState("");
    const {user} = useAuth();

    const sendMessage = () => {
        socket.emit("chat", message, user);
        setMessage("");
    }

    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                width: "100%",
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder={"Type a message"}
                variant="outlined"
                multiline={true}
                fullWidth
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                    onWriting(user);
                }}
                disabled={isDisabled}
                readOnly={isDisabled}
            />
            <IconButton disabled={isDisabled} onClick={sendMessage} type="button" sx={{p: '10px'}} aria-label="search">
                <SendIcon/>
            </IconButton>
        </Paper>
    );
};

export default ChatActions;