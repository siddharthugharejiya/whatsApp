import React, { useEffect } from 'react';
import './App.css';
import Messanger from './Componets/Messanger';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const clientid = "790287253231-bkps2bkp6qkvs55vgi0ba039u3tno4ms.apps.googleusercontent.com";

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://trusted-origin.com') {
        console.warn('Received message from untrusted origin:', event.origin);
        return;
      }
    
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [])

  return (
    <GoogleOAuthProvider clientId={clientid}>
      <Messanger />
    </GoogleOAuthProvider>
  );
}

export default App;
