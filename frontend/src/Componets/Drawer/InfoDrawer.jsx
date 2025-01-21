import { Box, Drawer, styled, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Profile from './Profile';

const Header  = styled(Box)`
         background : #008069;
         height : 110px;
         color: #FFFFFF;
         display:flex;
         & > svg {
        margin-top: auto;
        padding: 15px; /* Adds internal padding */
        font-weight: 600;
        width: 24px; /* Explicit width */
        // height: 24px; /* Explicit height */
        box-sizing: content-box; /* Ensures padding doesn't affect size */
        color: inherit; /* Matches the text color */
    
         }
          & > p{
           margin-top: auto;
            padding :15px;
          font-weight : 600
          }
`

const Componets = styled(Box)`
background : #ededed;
height:85%
`
const DrawerStyle = {
    left: 20,
    top: 15,
    height: '96%',
    width: '29%',
    boxShadow: "none"
}
function InfoDrawer({ open, setOpen }) {
    const handleclose = () => {
        setOpen(false)
    }
    return (
        <div>
            <Drawer
                open={open}
                onClose={handleclose}
                PaperProps={{ sx: DrawerStyle }}
                style={{ zIndex: 1500 }}
            >
                <Header>
                    <Box>
                        
                    </Box>
                <ArrowBackIcon onClick={()=>setOpen(false)}  />
                <Typography>Profile</Typography>
                </Header>
                    <Componets>
                      <Profile/>
                    </Componets>
            </Drawer>
        </div>
    )
}

export default InfoDrawer
