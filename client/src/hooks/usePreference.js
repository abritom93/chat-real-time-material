import {useContext} from "react";
import {PreferenceContext} from "../providers/PreferencesProvider.jsx";

export const usePreference = () => {
    const context = useContext(PreferenceContext);
    if (!context) {
        throw new Error('usePreference must be used within an Preference provider');
    }
    return context;
}