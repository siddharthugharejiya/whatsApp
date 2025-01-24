import React, { createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// Create context
export const AccountContext = createContext(null);

function AccountProvider({ children }) {
  const [account, setaccount] = useState(null); // Account state initialized as null
  const [person, setperson] = useState({}); // Default empty person state
  const [activeusers, setactiveusers] = useState([]); // Active users state
  const [NewOne,setNewOne]= useState(false)

  const socket = useRef();

  useEffect(() => {
    // Connect to socket server
    socket.current = io('http://localhost:9596');

    // Emit the user's presence when connected
    socket.current.on("connect", () => {
      if (account) {
        socket.current.emit("addUser", account);
      }
    });

    socket.current.on("getUsers", (users) => {
      setactiveusers(users); 
    });

    return () => {
      socket.current.disconnect();
    };
  }, [account]); 

  return (
    <AccountContext.Provider value={{setNewOne,NewOne, account, setaccount, person, setperson, socket, activeusers, setactiveusers }}>
      {children}
    </AccountContext.Provider>
  );
}

export default AccountProvider;
