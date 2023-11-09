const USER_KEY = "user";
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