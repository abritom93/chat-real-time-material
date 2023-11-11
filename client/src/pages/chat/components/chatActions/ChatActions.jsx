import React, {useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import {socket} from "../../../../socket.js";
import {useAuth} from "../../../../hooks/useAuth.js";
import {translateText} from "../../../../services/translatorService.js";
import {usePreference} from "../../../../hooks/usePreference.js";
import LoadingButton from '@mui/lab/LoadingButton';
import useToast from "../../../../hooks/useToast.jsx";

const ChatActions = ({onWriting, isDisabled}) => {
    const [message, setMessage] = useState("");
    const {user} = useAuth();
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const {languagePreference} = usePreference();
    const {sendErrorMessage} = useToast();

    const sendMessage = async () => {
        if (message?.trim() === "") {
            return
        }
        setIsSendingMessage(true);
        try {
            const {translation_text: translationText} = await translateText({
                textToTranslate: message,
                sourceLanguage: languagePreference.textInputLanguage,
                targetLanguage: languagePreference.textInputLanguageForSending
            })
            socket.emit("chat", translationText, user);
            setMessage("");
        } catch (e) {
            sendErrorMessage(e.message);
        } finally {
            setIsSendingMessage(false);
        }
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
            <LoadingButton
                loading={isSendingMessage}
                disabled={isDisabled || isSendingMessage}
                onClick={sendMessage}
                type="button" sx={{p: '10px'}}
                aria-label="search"
                endIcon={<SendIcon/>}
            />
        </Paper>
    );
};

export default ChatActions;