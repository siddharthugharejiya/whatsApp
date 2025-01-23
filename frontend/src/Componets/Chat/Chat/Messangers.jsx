import { Box, styled } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import Footer from './Footer';
import { AccountContext } from '../../Context/AccountProvider';
import { GetMessages, NewMessage } from '../../../Service/api';
import Message from './Message';

const Wrapper = styled(Box)`
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  background-size: 50%;
`;

const Componets = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

function Messangers({ person, conversation }) {
  console.log(conversation);
  console.log(`this is coverstion id = ${conversation._id}`);

  const [newMsgLoading, setnewMsgLoading] = useState(false);
  const [text, setText] = useState('');
  const { account } = useContext(AccountContext);
  const [file,setfile]=useState()
  const [messages, setmessages] = useState([]);

  useEffect(() => {
    const getMessagesDetails = async () => {
      if (conversation._id) {
        const data = await GetMessages(conversation._id);
        setmessages(data);
        console.log(data);
      }
    };
    getMessagesDetails();
  }, [person._id, conversation._id, newMsgLoading]);

  const sendText = async (text) => {
    if (text.trim() === '') return;

    if (!conversation._id) {
      console.error('No conversation ID available.');
      return;
    }
    const message = {
      senderId: account.sub,
      receiverId: person.sub,
      conversationId: conversation._id,
      type: 'text',
      text: text,
    };

    console.log('Message sent:', message);
    await NewMessage(message);
    setText('');
    setnewMsgLoading((pre) => !pre);
  };

  return (
    <Wrapper>
      <Componets>
        {messages &&
          messages.map((msg, index) => (
            <Message key={index} messages={msg} />
          ))}
      </Componets>
      <Footer text={text} setText={setText} sendText={sendText} setfile={setfile} file={file}  conversationId={conversation._id} messages={messages} setmessages={setmessages}/>
    </Wrapper>
  );
}

export default Messangers;
