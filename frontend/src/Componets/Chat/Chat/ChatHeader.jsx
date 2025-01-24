import React, { useContext, useEffect, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Search, MoreVert } from "@mui/icons-material";
import { AccountContext } from '../../Context/AccountProvider';

const Header = styled(Box)`
  height: 55px;
  padding: 8px 16px;
  background: #ededed;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled('img')({
  height: 40,
  width: 40,
  borderRadius: '50%',
  marginRight: 16,
  objectFit: 'cover',
});

const NameStatusBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled(Box)`
  display: flex;
  gap: 16px;
`;

function ChatHeader({ person }) {

  const { activeusers } = useContext(AccountContext);

  



  return (
    <Header>
      <Box display="flex" alignItems="center">
        <Image 
          src={person?.picture || 'https://www.gravatar.com/avatar/?d=mp'} 
          alt="dp" 
        />
        <NameStatusBox>
          <Typography variant="subtitle1">{person.name}</Typography>
          <Typography 
            variant="body2" 
            color="textSecondary"
          >
            {activeusers?.find(user => user.sub === person.sub) ? 'Online' : 'Offline'}
          
            
          </Typography>
        </NameStatusBox>
      </Box>
      <IconContainer>
        <Search />
        <MoreVert />
      </IconContainer>
    </Header>
  );
}

export default React.memo(ChatHeader);
