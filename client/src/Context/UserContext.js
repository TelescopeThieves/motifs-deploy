import {createContext, useState, useCallback} from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [loggedInUser, _setLoggedInUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user')) || {}
    })

    const [resErrors, setResErrors] = useState(false);
    
    const setLoggedInUser = useCallback((val) => {
        _setLoggedInUser(val)
    })

    const login = useCallback(async ({ email, password }) => {
        await axios
            .post(`/auth/login`, { email, password })
            .then((response) => {
                setResErrors(false);
                _setLoggedInUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
            })
            .catch((error) => {
                if (error.response) {
                setResErrors(error.response.data.message);
                } else {
                console.log("Error", error.message);
                }
            });
    }, []);

    const logout = useCallback(async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        await fetch(`/auth/logout/${user.userId}`, {
            method: 'POST',
            credentials: 'include', // Needed to include the cookie
        });
        setLoggedInUser({});
        localStorage.removeItem("user");
    }, []);
    
    return (
        <UserContext.Provider value={{loggedInUser, setLoggedInUser, login, logout, resErrors}}>
            {children}
        </UserContext.Provider>
    )
}