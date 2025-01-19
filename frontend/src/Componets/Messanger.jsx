import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled, Box } from '@mui/material';
import "../App.css";
import LoginDialog from './account/LoginDialog';
import { AccountContext } from './Context/AccountProvider';
import ChatDialog from './Chat/ChatDialog';

const Componets = styled(Box)`
  height: 100vh;
  background: #DCDCDC;  
`;

const LoginHeader = styled(AppBar)`
  height: 220px;  
  box-shadow: none;  
  background-color: #00bfa5;
`;

const Header = styled(AppBar)`
  height: 125px;  
  box-shadow: none;  
  background-color: #00A884;
`;

function Messanger() {
    const {account} = useContext(AccountContext)

    return (
        <Componets>
          {
            account ?
            <>
             <Header>
                <Toolbar>
                 
                </Toolbar>
            </Header>
            <ChatDialog/> 
            </>
            :           
             <>
               <LoginHeader>
                <Toolbar>
                 
                </Toolbar>
            </LoginHeader>
            <LoginDialog />
            </>
          }
          
           
            
          

      
        </Componets>
    );
}

export default Messanger;
