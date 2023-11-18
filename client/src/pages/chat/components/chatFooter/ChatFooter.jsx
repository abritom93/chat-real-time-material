import React, {useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import {useAuth} from "../../../../hooks/useAuth.js";
import LoadingButton from '@mui/lab/LoadingButton';
import useSendMessage from "../../hooks/useSendMessage.jsx";

const ChatFooter = ({onWriting, isDisabled}) => {
    const [message, setMessage] = useState("");
    const {user} = useAuth();
    const {isSendingMessage, sendMessage} = useSendMessage()

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
            <LoadingButton
                loading={isSendingMessage}
                disabled={isDisabled || isSendingMessage}
                onClick={sendMessage}
                type="button"
                sx={{p: '10px'}}
                aria-label="search"
                endIcon={<SendIcon/>}
            />
        </Paper>
    );
};

export default ChatFooter;