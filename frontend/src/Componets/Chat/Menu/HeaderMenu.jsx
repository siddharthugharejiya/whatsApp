import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, styled } from '@mui/material';


function HeaderMenu({setopenDrawer}) {
    const [open, setopen] = useState(null)

    const handleClose = () => {
        setopen(null)
    }
    const handleClick = (event) => {
        setopen(event.currentTarget)
    }

    const MenuItems = styled(MenuItem)`
    font-size : 14px;
    padding : 15px 60px 5px 24px;
    color : #4A4A4A;
    `
    return (
        <div>
            <MoreVertIcon onClick={handleClick} />
            <Menu
                id="basic-menu"
                anchorEl={open}
                keepMounted
                open={open}
                getContentAnchorEl={null}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItems onClick={() => { handleClose(); setopenDrawer(true); }}>Profile</MenuItems>

            </Menu>
        </div>
    )
}

export default HeaderMenu
