import React from 'react';
// import LoginDialog from './account/LoginDialog'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled, Box } from '@mui/material';
import "../App.css";
import LoginDialog from './account/LoginDialog';
const Componets = styled(Box)`
  height: 100vh;
  background: #DCDCDC;  
`;

const Header = styled(AppBar)`
  height: 220px;  
  box-shadow: none;  
  background-color: #00bfa5;
`;

function Messanger() {
    return (
        <Componets>
            <Header>
                <Toolbar>
                 
                </Toolbar>
            </Header>
            
            <LoginDialog />
        </Componets>
    );
}

export default Messanger;
