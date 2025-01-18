import { Dialog, List, ListItem, Typography, Box, styled } from '@mui/material';
import React from 'react';
import { qrCodeImage } from '../Constants/data';
import { GoogleLogin } from "@react-oauth/google";
import * as jwt_decode  from 'jwt-decode'; // Correct import

const Componets = styled(Box)`
    display: flex;
`;

const Container = styled(Box)`
    padding: 56px 0 56px 56px; 
`;

const DialogCss = {
    height: "96%",
    marginTop: "12%",
    width: "60%",
    maxWidth: "100%",
    maxHeight: "100%",
    boxShadow: "none",
    overflow: "hidden"
};

const QrCode = styled('img')({
    height: 264,
    width: 264,
    margin: "0px 0 0 50px",
    position: "relative"
});

const Title = styled(Typography)`
    font-size: 30px;
    color: #525252;
    font-weight: 300;
    font-family: inherit;
    margin-bottom: 25px;
`;

const StyledList = styled(List)`
    & > li {
        padding: 0; 
        margin-top: 15px;
        font-size: 18px;
        color: #4a4a4a;
    }
`;

const onLoginSuccess = (response) => {
    console.log("Login Success:", response.credential);
    try {
        const decoded = jwt_decode(response.credential);
        console.log("Decoded JWT:", decoded);
    } catch (error) {
        console.error("JWT Decode Error:", error);
    }
};

const onLoginError = () => {
    console.error("Login Error");
};

function LoginDialog() {
    return (
        <Dialog open={true} PaperProps={{ sx: DialogCss }}>
            <Componets>
                <Container>
                    <Title>
                        Log into WhatsApp Web   
                    </Title>
                    <StyledList>
                        <ListItem>1. Open WhatsApp on your phone</ListItem>
                        <ListItem>2. Tap Menu on Android, or Settings on iPhone</ListItem>
                        <ListItem>3. Tap Link Device and then Link Device</ListItem>
                        <ListItem>4. Point your phone at this screen to scan the QR code</ListItem>
                    </StyledList>
                </Container>
                <Box style={{ position: "relative", margin: "0 0 0 50px" }}>
                    <QrCode src={qrCodeImage} alt="QR Code" />
                    <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                        <GoogleLogin 
                            onSuccess={onLoginSuccess}
                            onError={onLoginError}
                        />
                    </Box>
                </Box>
            </Componets>
        </Dialog>
    );
}

export default LoginDialog;
