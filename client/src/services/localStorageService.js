const USER_KEY = "user";
const LANGUAGE_PREFERENCES_KEY = "language_preferences";

export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
        return user;
    }
}

export const setUserData = (user) => {
    localStorage.setItem(USER_KEY, user);
}

export const isLogged = () => {
    return !!getUser();
}

export const logoutUser = () => {
    localStorage.removeItem(USER_KEY);
}


export const getLanguagePreferencesFromStorage = () => {
    const languagePreference = localStorage.getItem(LANGUAGE_PREFERENCES_KEY);
    if (languagePreference) {
        return JSON.parse(languagePreference);
    }
}

export const setlanguagePreferencesInStorage = (languagePreference) => {
    if (languagePreference) {
        return localStorage.setItem(LANGUAGE_PREFERENCES_KEY, JSON.stringify(languagePreference));
    }
}