import React, { useContext, useEffect, useState } from 'react';
import { Getuser } from '../../../Service/api';
import { Box, Divider, styled } from "@mui/material";
import Converse from './Converse'; 
import { AccountContext } from '../../Context/AccountProvider';

function Conversation({ text }) {
  const [users, setUsers] = useState([]);
  const { account , socket, activeusers, setactiveusers } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Getuser();
        const filteredData = response.filter(user => 
          user.name.toLowerCase().includes(text.toLowerCase())
        );
        setUsers(filteredData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [text]);

  useEffect(() => {
    socket.current.emit('addUsers', account);
    socket.current.on('getUsers', Users => {
      setactiveusers(Users);
    })
    
  }, [ account])

  const Components = styled(Box)`
    height: 81vh;
    overflow: overlay;
  `;

  const DividerStyle = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: 0.6;
  `;

  return (
    <Components>
      {users.map((user) => (
        user.sub !== account.sub && (
          <React.Fragment key={user.sub}>
            <Converse user={user} />
            <DividerStyle key={user.sub} />
          </React.Fragment>
        )
      ))}
    </Components>
  );
}

export default Conversation;
