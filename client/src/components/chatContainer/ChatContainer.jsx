import React, {useEffect, useState} from 'react';
import ChatMessageList from "../chatMessageList/ChatMessageList.jsx";
import ChatActions from "../chatActions/ChatActions.jsx";
import {socket} from "../../socket.js";
import {useAuth} from "../../hooks/useAuth.js";
import ChatHeader from "../chatHeader/ChatHeader.jsx";
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import styles from "./ChatContainer.module.css";

const ChatContainer = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const [authorWriting, setAuthorWriting] = useState(null);
    const [timer, setTimer] = useState(null);
    const {user} = useAuth();

    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onMessage(msg, serverOffset, username) {
            const newMessage = {
                author: username,
                content: msg
            };
            setMessages(previewState => [...previewState, newMessage]);
        }

        function onWriting(author) {
            setAuthorWriting(author);
        }

        function onWritingEnd(author) {
            setAuthorWriting(null);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chat', onMessage);
        socket.on('writing', onWriting);
        socket.on('writingEnd', onWritingEnd);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('chat', onMessage);
            socket.off('writing', onWriting);
            socket.off('writingEnd', onWritingEnd);
        };
    }, []);

    const onWriting = user => {
        socket.emit("writing", user)
        clearTimeout(timer)

        const newTimer = setTimeout(() => {
            socket.emit("writingEnd", user)
        }, 1500)

        setTimer(newTimer)
    }

    let disabled = !user;

    return (
        <Grid container className={styles.ChatContainer}>
            <Grid item xs={12} md={8} xl={4}>
                {disabled && (<Alert severity="warning">You must be logged in!</Alert>)}
                <div className={styles.ChatContainer__header}>
                    <ChatHeader
                        authorWriting={authorWriting}
                    />
                </div>
                    <div className={styles["ChatContainer__messages"]}>
                        <ChatMessageList
                            messages={messages}
                        />
                    </div>
                    <div className={styles["ChatContainer__actions"]}>
                        <ChatActions
                            onWriting={onWriting}
                            isDisabled={disabled}
                        />
                    </div>
            </Grid>
        </Grid>
    );
};

export default ChatContainer;