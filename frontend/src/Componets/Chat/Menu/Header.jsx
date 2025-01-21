import React, { useContext, useState } from 'react';
import { AccountContext } from '../../Context/AccountProvider';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, styled } from '@mui/material';
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../Drawer/InfoDrawer';

const Componets = styled(Box)`
  height: 55px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const Wrapper = styled(Box)`
  display: flex;
  margin-left: auto;
  & > * {
    margin-left: 2px;
    padding: 1px;
    color: #000;
  }
  & :first-child {
    font-size: 22px;
    margin-right: 8px;
    margin-top: 2px;
  }
`;

const StyledImage = styled('img')({
  height: 40,
  width: 40,
  borderRadius: "50%",
});

const MemoizedImage = React.memo(({ src, onClick }) => (
  <StyledImage src={src} alt="UserProfile" onClick={onClick} />
));

function Header() {
  const { account } = useContext(AccountContext);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <div>
      <Componets>
        <MemoizedImage src={account.picture} onClick={toggleDrawer} />
        <Wrapper>
          <ChatIcon />
          <HeaderMenu setopenDrawer={setOpenDrawer} />
        </Wrapper>
      </Componets>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </div>
  );
}

export default Header;
