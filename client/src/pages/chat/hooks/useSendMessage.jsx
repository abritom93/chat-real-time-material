import {useState} from 'react';
import {translateText} from "../../../services/translatorService.js";
import {socket} from "../../../socket.js";
import {usePreference} from "../../../hooks/usePreference.js";
import {useAuth} from "../../../hooks/useAuth.js";
import useToast from "../../../hooks/useToast.jsx";

const useSendMessage = () => {
    const [message, setMessage] = useState("");
    const {languagePreference} = usePreference();
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const {user} = useAuth();
    const {sendErrorMessage} = useToast();

    const sendMessage = async () => {
        if (message?.trim() === "") {
            return;
        }
        setIsSendingMessage(true);

        if (languagePreference.textInputLanguage === languagePreference.textInputLanguageForSending) {
            socket.emit("chat", message, user);
            setMessage("");
            return;
        }

        translateText({
            textToTranslate: message,
            sourceLanguage: languagePreference.textInputLanguage,
            targetLanguage: languagePreference.textInputLanguageForSending
        }).then(({translation_text}) => {
            socket.emit("chat", translation_text, user);
            setMessage("");
        }).catch(error => {
            sendErrorMessage(error.message);
        }).finally(() => {
            setIsSendingMessage(false);
        })
    }

    return {isSendingMessage, sendMessage};
};

export default useSendMessage;