import { Box, InputBase, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EmojiEmotionsOutlined from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import { uploadFiled } from '../../../Service/api';

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

function Footer({ text, setText, sendText, file, setfile, conversationId }) {
  useEffect(() => {
    const getimage = async () => {
      if (file) {
        console.log("File object:", file);
  
        const data = new FormData();
        data.append("file", file); // Append the file to the FormData
        data.append("conversationId", conversationId); // Append conversationId to FormData
  
        // Optional: Create a plain object to log FormData for debugging
        let formDataObj = {};
        data.forEach((value, key) => {
          formDataObj[key] = value instanceof File ? value.name : value;
        });
        console.log("FormData Object:", formDataObj);
  
        try {
          // Pass the FormData object to the uploadFiled function
          const response = await uploadFiled(data);  // 'data' is FormData
          console.log("File uploaded successfully, Response:", response);
  
          // Check the response and handle the imageUrl if available
          if (response && response.imageUrl) {
            console.log("Uploaded file URL:", response.imageUrl);
          }
        } catch (error) {
          console.error("Error uploading file:", error.message);
        }
      }
    };
  
    getimage();
  }, [file, conversationId]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim()) {
      sendText(text);
    }
  };

  const Change = (e) => {
    const newFile = e.target.files[0]; // Get the selected file
    setfile(newFile);  // Set the file in state
    setText(newFile.name);  // Set file name as the input text (optional)
  };

  return (
    <Container>
      <EmojiEmotionsOutlined />
      <label htmlFor="fileInput">
        <Clip />
      </label>
      <input type="file" id='fileInput' style={{ display: "none" }} onChange={Change} />
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
