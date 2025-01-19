import { Dialog } from '@mui/material'
import React from 'react'

const DialogCss = {
    height: "96%",
   margin : "20px",
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "none",
    overflow: "hidden"
};
function ChatDialog() {
  return (
    <>
      <Dialog open={true} PaperProps={{sx : DialogCss}} hideBackdrop={true}> 

      </Dialog>
    </>
  )
}

export default ChatDialog
