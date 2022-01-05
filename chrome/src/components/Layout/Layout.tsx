import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import NoteListDrawer from '../model/note/NoteListDrawer';

const headerHeight = 64;
const drawerWidth = 240;

type AppBarProps = MuiAppBarProps & {
  open: boolean;
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  height: headerHeight,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

type MainProps = { open: boolean };

const Main = styled('main', {
  shouldForwardProp: prop => prop !== 'open',
})<MainProps>(({ theme, open }) => ({
  height: `calc(100% - ${headerHeight}px)`,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.VFC<LayoutProps> = React.memo(props => {
  return (
    <>
      <CssBaseline />
      <LayoutContent {...props} />
    </>
  );
});

Layout.displayName = 'Layout';

export default Layout;

const LayoutContent: React.VFC<LayoutProps> = React.memo(props => {
  const { children } = props;
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleClickMenu = useCallback(() => {
    setOpenDrawer(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  return (
    <Box sx={{ height: '100vh' }}>
      {/* header */}
      <AppBar position='static' open={openDrawer}>
        <Toolbar>
          <IconButton onClick={handleClickMenu}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <NoteListDrawer
        open={openDrawer}
        width={drawerWidth}
        onClose={handleCloseDrawer}
      />

      {/* main content */}
      <Main open={openDrawer}>{children}</Main>
    </Box>
  );
});

LayoutContent.displayName = 'LayoutContent';