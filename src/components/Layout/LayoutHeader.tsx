import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React, { useCallback } from 'react';

export type LayoutHeaderProps = AppBarProps & {
  popup?: boolean;

  openDrawer?: boolean;
  onOpenDrawer: () => void;
};

const LayoutHeader: React.VFC<LayoutHeaderProps> = React.memo(props => {
  const { popup, openDrawer, onOpenDrawer, ...appBarProps } = props;

  const handleClickOpenApp = useCallback(() => {
    const url = chrome.runtime.getURL('app.html');
    chrome.tabs.create({ url });
  }, []);

  return (
    <AppBar
      {...appBarProps}
      position='static'
      sx={{
        justifyContent: 'center',
        ...appBarProps.sx,
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Box hidden={openDrawer}>
            <IconButton color='secondary' onClick={onOpenDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>

        <Box hidden={!popup}>
          <Button
            color='secondary'
            variant='contained'
            onClick={handleClickOpenApp}
            sx={{ mr: 1 }}
          >
            Open App
          </Button>
        </Box>

        <IconButton
          size='small'
          href='https://github.com/koki-develop/awesome-notes'
          target='_blank'
          rel='noreferrer noopener'
        >
          <GitHubIcon fontSize='large' htmlColor='white' />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
});

LayoutHeader.displayName = 'LayoutHeader';

export default LayoutHeader;
