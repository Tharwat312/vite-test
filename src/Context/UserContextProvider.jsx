import React, { createContext, useState } from 'react'
export const UserContext = createContext("");
const UserContextProvider = (props) => {
    const [token, setToken] = useState(null);
    return (
        <UserContext.Provider value={{ token, setToken }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;
