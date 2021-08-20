import {createContext, useState, useCallback} from 'react'

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    
    const [loggedInUserContext, _setLoggedInUserContext] = useState(() => {
        return JSON.parse(localStorage.getItem('user context')) || {}
    })

    const setLoggedInUserContext = useCallback((val) => {
        _setLoggedInUserContext(val)
        localStorage.setItem('user context', JSON.stringify(val))
    })
    
    return (
        <UserContext.Provider value={{loggedInUserContext, setLoggedInUserContext}}>
            {children}
        </UserContext.Provider>
    )
}