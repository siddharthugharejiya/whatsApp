import React, { useState } from "react"
import {Box} from "@mui/material"
import Header from "./Header"
import Search from "./Search"
import Conversation from "./Conversation"
const Menu = () =>{
    const [text,settext]=useState('')
    return(
        <>
        <Box>
        <Header/>
        <Search settext={settext}/>
        <Conversation text={text}/>
        </Box>
       
        </>
    )
}
export default Menu