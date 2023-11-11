import React, {createContext, useEffect, useState} from 'react';
import {getLanguagePreferencesFromStorage, setlanguagePreferencesInStorage} from "../services/localStorageService.js";

export const PreferenceContext = createContext({});

export const PreferenceProvider = ({children}) => {
    const [languagePreference, setLanguagePreferences] = useState(null);

    useEffect(() => {
        const preferenceLanguage = getLanguagePreferencesFromStorage();
        if (preferenceLanguage) {
            setLanguagePreferences(preferenceLanguage);
        }
    }, []);

    const setLanguagePreference = (languagePreference) => {
        setLanguagePreferences(languagePreference);
        setlanguagePreferencesInStorage(languagePreference);
    };

    return (
        <PreferenceContext.Provider value={{languagePreference, setLanguagePreference}}>
            {children}
        </PreferenceContext.Provider>
    );
}