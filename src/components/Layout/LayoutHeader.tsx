import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React, { useCallback } from 'react';
import GitHubIcon from '@/static/images/github-icon.svg';

export type LayoutHeaderProps = {
  popup?: boolean;

  openDrawer?: boolean;
  onOpenDrawer: () => void;
};

const LayoutHeader: React.VFC<LayoutHeaderProps> = React.memo(props => {
  const { popup, openDrawer, onOpenDrawer } = props;

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  const headerHeight = 64;
  const drawerWidth = isSmDown || popup ? 200 : 240;

  const handleClickOpenApp = useCallback(async () => {
    const url = chrome.runtime.getURL('app.html');
    chrome.tabs.create({ url });
  }, []);

  return (
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
            <IconButton color='secondary' onClick={onOpenDrawer}>
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
  );
});

LayoutHeader.displayName = 'LayoutHeader';

export default LayoutHeader;
