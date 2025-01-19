import React, { createContext, useState } from "react";

export const AccountContext = createContext()

function AccountProvider({ children }) {
    const [account, setaccount] = useState()
    return (
        <AccountContext.Provider value={{ account, setaccount }}>
            {children}
        </AccountContext.Provider>
    );
}

export default AccountProvider;
