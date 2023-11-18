import React, {createContext, useEffect, useState} from 'react';
import {socket} from "../socket.js";
import {useAuth} from "../hooks/useAuth.js";

export const ChatContext = createContext({});

export const ChatProvider = ({children}) => {
    const [activeUsers, setActiveUsers] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        socket.connect();

        function onConnect() {
            if (!user) {
                return;
            }
            socket.emit("join", user);
        }

        function onActiveUsers(activeUsers) {
            setActiveUsers(activeUsers?.filter(activeUser => user !== activeUser && activeUser !== "unknown"));
        }

        function onDisconnect() {
        }

        socket.on('connect', onConnect);
        socket.on('activeUsers', onActiveUsers);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.disconnect();
            socket.off('connect', onConnect);
            socket.off('activeUsers', onActiveUsers);
            socket.off('disconnect', onDisconnect);
        };
    }, [user]);


    return (
        <ChatContext.Provider value={{activeUsers}}>
            {children}
        </ChatContext.Provider>
    );
}