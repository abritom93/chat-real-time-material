import React, {createContext, useEffect, useState} from 'react';
import {getUser, logoutUser, setUserData} from "../services/localStorageService.js";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (getUser()) {
            setUser(getUser());
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        setUserData(userData);
    };

    const logout = () => {
        setUser(null);
        logoutUser();
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}