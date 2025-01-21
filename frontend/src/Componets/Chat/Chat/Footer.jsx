import { Box, InputBase, styled } from '@mui/material';
import React, { useState } from 'react';
import EmojiEmotionsOutlined from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  background-color: #ffffff;
  border-radius: 20px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 5px;
`;

const InputFieldss = styled(InputBase)`
  padding: 17px;
  height: 10px;
  padding-left: 25px;
  font-size: 14px;
`;

const Clip = styled(AttachFileOutlinedIcon)`
  transform: rotate(40deg);
`;

function Footer({ text, setText, sendText }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim()) {
      sendText(text);
    }
  };

  return (
    <Container>
      <EmojiEmotionsOutlined />
      <Clip />
      <input type="file" style={{display : "none"}} />
      <Search>
        <InputFieldss
          placeholder="Type a message"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Search>
      <MicOutlinedIcon />
    </Container>
  );
}

export default Footer;
