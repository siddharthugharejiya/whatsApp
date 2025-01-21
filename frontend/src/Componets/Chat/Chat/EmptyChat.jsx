import { Box, styled, Typography ,Divider } from '@mui/material'
import React from 'react'
import { emptyChatImage } from '../../Constants/data'
const Componets = styled(Box)`
background : #f8f9fa;
padding : 30px 0;
text-align:center;
height:100vh;
`
const Container = styled(Box)`
padding : 0 200px;
`
const Img = styled('img')({
  width:400,
  marginTop:100
})
const Title = styled(Typography)`
font-size : 32px;
margin: 25px 0 10px 0;
font-family:inherit;
font-weight:300;
color : #41525d;
`
const Subtitle = styled(Typography)`
font-size : 14px;
color : #667781;
font-family:inherit;
font-weight:400;



`
const DividerStyle = styled(Divider)`
 margin : 40px 0;
 opacity : 0.4;
`
function EmptyChat() {
  return (
    <div>
      <Componets>
        <Container>
          <Img src={emptyChatImage} alt="" />
          <Title>WhatApp Web</Title>
          <Subtitle>Now send and receive messages without keeping your phone online.
          </Subtitle>
          <Subtitle>
            Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
          </Subtitle>


          <DividerStyle/>

        </Container>
      </Componets>
    </div>
  )
}

export default EmptyChat
