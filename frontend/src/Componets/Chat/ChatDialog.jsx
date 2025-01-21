import { Box, Dialog, styled } from '@mui/material';
import React, { useContext } from 'react';
import Menu from './Menu/Menu';
import EmptyChat from './Chat/EmptyChat';
import ChatBox from './Chat/ChatBox';
import { AccountContext } from '../Context/AccountProvider';

const DialogCss = {
    height: "96%",
    margin: "20px",
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "none",
    overflow: "hidden"
};

const Components = styled(Box)`
    display: flex;
`;

const LeftComponents = styled(Box)`
    min-width: 450px;
`;

const RightComponents = styled(Box)`
    width: 73%;
    min-width: 300px;
    height: 100%;
    border-left: 1px solid rgba(0,0,0,0.14);
`;

function ChatDialog() {
      const { person } = useContext(AccountContext);
    
    return (
        <>
            <Dialog open={true} PaperProps={{ sx: DialogCss }} hideBackdrop={true} maxWidth="md">
                <Components>
                    <LeftComponents>
                        <Menu />
                    </LeftComponents>
                    <RightComponents>
                        {/* <EmptyChat /> */}
                        {/* <ChatBox/> */}
                        {Object.keys(person).length ? <ChatBox/> : <EmptyChat/>}
                    </RightComponents>
                </Components>
            </Dialog>
        </>
    );
}

export default ChatDialog;  
