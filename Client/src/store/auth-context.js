import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;

const AuthContext = React.createContext(
    {
        email: '',
        token: '',
        isLoggedIn: false,
        login: (token) => { },
        logout: () => { }
    });

const calculationRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedemail = localStorage.getItem('email');
    const StoredExpirationDate = localStorage.getItem('expirationTime');
    const remainingTime = calculationRemainingTime(StoredExpirationDate);

    if (remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
        email: storedemail
    };
}

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();

    let intialToken;
    let Email;
    if (tokenData) {
        intialToken = tokenData.token;
        Email = tokenData.email;
    }
    const [token, setToken] = useState(intialToken);
    const [email, setEmail] = useState(Email);
    const userIsLoggedIn = !!token;


    const logoutHandler = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('expirationTime');
        setToken(null);

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, [])

    const loginHandler = (token, expirationTime, email) => {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('expirationTime', expirationTime);
        setToken(token);
        setEmail(email);
        const remainTime = calculationRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainTime);
    }

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler])

    const contextToken = {
        email: email,
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextToken}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;