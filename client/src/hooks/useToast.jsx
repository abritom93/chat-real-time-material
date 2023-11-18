import React from 'react';
import toast from "react-hot-toast";

const useToast = () => {

    const sendSuccessMessage = (message) => {
        toast.success(message);
    }

    const sendErrorMessage = (message) => {
        toast.error(message);
    }

    return {
        sendSuccessMessage,
        sendErrorMessage
    }
};

export default useToast;