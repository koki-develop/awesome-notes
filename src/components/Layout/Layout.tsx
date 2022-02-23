import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React, { useCallback, useEffect, useState } from 'react';
import NoteListDrawer from '@/components/model/note/NoteListDrawer';
import { LocalStorage } from '@/lib/localStorage';
import GitHubIcon from '@/static/images/github-icon.svg';
import { theme } from './theme';

export type LayoutProps = {
  children: React.ReactNode;

  popup?: boolean;
};

const Layout: React.VFC<LayoutProps> = React.memo(props => {
  return (
    <ThemeProvider theme={theme}>
      <LayoutContent {...props} />
    </ThemeProvider>
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
    LocalStorage.getOpenDrawer({ popup }),
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
    LocalStorage.setOpenDrawer(openDrawer, { popup });
  }, [openDrawer, popup]);

  return (
    <Box sx={{ height: '100vh', minWidth: 750, minHeight: 500 }}>
      <CssBaseline />

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
              <IconButton color='secondary' onClick={handleClickMenu}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
          {popup && (
            <Button
              color='secondary'
              variant='contained'
              onClick={handleClickOpenApp}
              sx={{ fontWeight: 'bold', mr: 1 }}
            >
              Open App
            </Button>
          )}
          <IconButton
            size='small'
            href='https://github.com/koki-develop/awesome-notes'
            target='_blank'
            rel='noreferrer noopener'
          >
            <Avatar src={GitHubIcon} sx={{ height: 32, width: 32 }} />
          </IconButton>
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
