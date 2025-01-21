import { Box, styled, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AccountContext } from '../../Context/AccountProvider';
import { setConverstion } from '../../../Service/api';

// Styled components
const Component = styled(Box)`
  display: flex;
  align-items: center;
  height: 70px;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const Image = styled('img')({
  height: 50,
  width: 50,
  borderRadius: '50%',
  marginRight: '14px',
  objectFit: 'cover',
});

const UserDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserName = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const ErrorText = styled(Typography)`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

// Converse component
function Converse({ user }) {
  const { setperson, account } = useContext(AccountContext);
  const [error, setError] = useState(null); // State to manage errors

  const getusers = async () => {
    if (!user || !account) {
      setError('User or account information is missing.');
      return;
    }

    try {
      setperson(user); // Set the selected person in context
      await setConverstion({
        senderId: account.sub,
        receiverId: user.sub,
      });
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Error setting conversation: " + error.message);
      console.error("Error setting conversation:", error);
    }
  };

  return (
    <>
      <Component onClick={getusers}>
        <Image src={user.picture || 'default-image.jpg'} alt={user.name} />
        <UserDetails>
          <UserName>{user.name}</UserName>
        </UserDetails>
      </Component>
      {error && <ErrorText>{error}</ErrorText>} {/* Show error message if any */}
    </>
  );
}

export default Converse;
