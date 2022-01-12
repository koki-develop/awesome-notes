import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { LocalStorage } from '@/lib/localStorage';
import NoteListDrawer from '@/components/model/note/NoteListDrawer';

export type LayoutProps = {
  children: React.ReactNode;

  popup?: boolean;
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
  const { children, popup } = props;
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const headerHeight = 64;
  const drawerWidth = isSmDown || popup ? 200 : 240;

  const [openDrawer, setOpenDrawer] = useState<boolean>(
    LocalStorage.getOpenDrawer(),
  );

  const handleClickOpenApp = useCallback(async () => {
    const url = chrome.runtime.getURL('app.html');
    chrome.tabs.create({ url });
  }, []);

  const handleClickMenu = useCallback(() => {
    setOpenDrawer(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  useEffect(() => {
    LocalStorage.setOpenDrawer(openDrawer);
  }, [openDrawer]);

  return (
    <Box sx={{ height: '100vh', minWidth: 750, minHeight: 500 }}>
      {/* header */}
      <AppBar
        position='static'
        sx={theme => ({
          justifyContent: 'center',
          height: headerHeight,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(openDrawer && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        })}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            {!openDrawer && (
              <IconButton onClick={handleClickMenu}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
          {popup && (
            <Button variant='contained' onClick={handleClickOpenApp}>
              Open App
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <NoteListDrawer
        open={openDrawer}
        headerHeight={headerHeight}
        width={drawerWidth}
        onClose={handleCloseDrawer}
      />

      {/* main content */}
      <Box
        component='main'
        sx={theme => ({
          height: `calc(100% - ${headerHeight}px)`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          wordBreak: 'break-all',
          ...(openDrawer && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        })}
      >
        {children}
      </Box>
    </Box>
  );
});

LayoutContent.displayName = 'LayoutContent';
