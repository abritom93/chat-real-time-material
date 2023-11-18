import React from 'react';
import {usePreference} from "../../hooks/usePreference.js";
import {Navigate} from "react-router-dom";
import {getLanguagePreferencesFromStorage} from "../../services/localStorageService.js";

const CheckPreference = ({children}) => {

    const {languagePreference} = usePreference();
    const languagePreferenceFromStorage= getLanguagePreferencesFromStorage();

    if (!languagePreference && !languagePreferenceFromStorage) {
        return <Navigate to={"/settings"}/>
    }
    return children;
};

export default CheckPreference;