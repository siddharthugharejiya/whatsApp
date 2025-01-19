import React, { useEffect } from 'react';
import './App.css';
import Messanger from './Componets/Messanger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './Componets/Context/AccountProvider';

function App() {
  const clientid = "452198963860-c65auka4jj4uum646ahu2td297c2rv86.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientid}>
      <AccountProvider>
      <Messanger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
