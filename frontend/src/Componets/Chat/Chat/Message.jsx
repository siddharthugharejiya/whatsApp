import { Box, Typography, styled } from '@mui/material';
import React, { useContext } from 'react';
import { Formate_date } from '../../../utils/Common-Utils';
import { AccountContext } from '../../Context/AccountProvider';

const Wrapper = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  margin-bottom: 10px;
  padding: 10px 15px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Own = styled(Box)`
  background: #ffffff;
  max-width: 60%;
  margin-bottom: 10px;
  padding: 10px 15px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0px 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  align-self: flex-end;
`;

function Message({ messages }) {
  const { account } = useContext(AccountContext);

  return (
    <>
      {account.sub === messages.senderId ? (
          <Wrapper>
          <Text>{messages.text}</Text>
          <Time>{Formate_date(messages.createdAt)}</Time>
        </Wrapper>
      ) : (
      

<Own>
<Text>{messages.text}</Text>
<Time>{Formate_date(messages.createdAt)}</Time>
</Own>
      )}
    </>
  );
}

export default Message;
