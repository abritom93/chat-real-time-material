import {useContext} from "react";
import {ChatContext} from "../providers/ChatProvider.jsx";

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within an Chat provider');
    }
    return context;
}