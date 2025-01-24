import { Box, styled, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from '../../Context/AccountProvider';
import { getConverstion, setConverstion } from '../../../Service/api';
import { Formate_date } from '../../../utils/Common-Utils';

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

const LastMessage = styled(Typography)`
  font-size: 14px;
  color: #999;
  margin-top: 5px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ErrorText = styled(Typography)`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

function Converse({ user }) {
  const { setperson, account } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ text: '', timestamp: null });

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // Fetch conversation data
        const data = await getConverstion({ senderId: account.sub, receiverId: user.sub });

        // Handle the response data
        if (data && data.message) {
          setMessage({
            text: data.message,
            timestamp: data.updatedAt,
          });
        } else {
          setMessage({ text: 'No message available', timestamp: null });
        }
      } catch (err) {
        setError('Failed to fetch conversation: ' + err.message);
      }
    };

    fetchMessage();
  }, [user, account]);

  const handleUserClick = async () => {
    try {
      // Set selected user in context
      setperson(user);

      // Create or fetch a conversation
      await setConverstion({ senderId: account.sub, receiverId: user.sub });

      setError(null); // Clear errors
    } catch (err) {
      setError('Failed to set conversation: ' + err.message);
    }
  };

  return (
    <>
      <Component onClick={handleUserClick}>
        <Box>
          <Image src={user.picture || 'https://via.placeholder.com/50'} alt={user.name} />
        </Box>
        <Box>
          <Typography>{user.name}</Typography>
          <LastMessage>{message.text}</LastMessage>
          {message.timestamp && (
            <Typography variant="caption" color="textSecondary">
              {Formate_date(message.timestamp)}
            </Typography>
          )}
        </Box>
      </Component>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
}

export default Converse;
