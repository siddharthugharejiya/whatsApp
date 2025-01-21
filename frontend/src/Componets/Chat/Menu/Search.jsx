import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase, styled } from '@mui/material';
const Componets = styled(Box)`
    background : #fff;
    height : 45px;
    border-bottom : 1px solid #F2F2F2;
        display : flex;
    align-items : center;
`
const Wrapper = styled(Box)`
    background-color : #f0f2f5;
    position : relative;
    margin : 0px 13px;
    width:100%;
    display:flex;
    border-radius :10px

  
`
const Icons = styled(Box)`
position:absolute;
height:100%;
padding :6px 10px;
color : #919191;
`
const InputFields = styled(InputBase)`
width:100%;
    height : 15px;
padding:16px;
padding-left:65px;
font-size : 14px
`
function Search({settext}) {
  return (
    <>
       <Componets>
        <Wrapper>
            <Icons>
             <SearchIcon fontSize='small'/>
            </Icons>
            <InputFields placeholder='Search or start new chat' onChange={(e)=>settext(e.target.value)}/>
        </Wrapper>
       </Componets>
    </>
  )
}

export default Search
