import React, {useEffect, useRef} from 'react';
import ChatMessageItem from "../chatMessageItem/ChatMessageItem.jsx";
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import styles from "./styles.module.css";

const ChatMessageList = ({messages}) => {
    const ulRef = useRef(null);

    useEffect(() => {
        if (ulRef.current) {
            ulRef.current.scrollTop = ulRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Box sx={
            {
                width: '100%',
                bgcolor: 'background.paper'
            }
        }>
            <List sx={{
                width: '100%',
                position: 'relative',
                overflow: 'auto',
                maxHeight: "70vh"
            }}
                  ref={ulRef}
                  className={styles["ChatMessageList"]}
            >
                {messages.map(({content, author}) => (
                    <ChatMessageItem
                        key={crypto.randomUUID()}
                        content={content}
                        author={author}
                    />
                ))}
            </List>
        </Box>
    );
};

export default ChatMessageList;