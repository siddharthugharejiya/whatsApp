import { Box, Dialog } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import Messangers from './Messangers'
import { AccountContext } from '../../Context/AccountProvider'
import { getConverstion } from '../../../Service/api'

function ChatBox() {
  const {person,account} = useContext(AccountContext) 
  const [conversation,setconversation] = useState({})
  
  useEffect(()=>{
    
    const getConversationDetails = async() =>{
      const data =  await getConverstion({senderId : account.sub, receiverId : person.sub})
      console.log(data);
      
      setconversation(data)
    }
    getConversationDetails()
  },[person.sub,account.sub])
  console.log(conversation);
  return (
   <>

   <Box style={{height:'75%'}}>

    <ChatHeader person={person}/>
    
    <Messangers person={person} conversation={conversation} />
   
   </Box>
  
   </>
  )
}

export default ChatBox
