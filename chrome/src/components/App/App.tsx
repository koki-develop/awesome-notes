import React, { useCallback, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import NoteListDrawer from '../model/note/NoteListDrawer';
import NoteEditor from '../model/note/NoteEditor';

const drawerWidth = 240;

type AppBarProps = MuiAppBarProps & {
  open: boolean;
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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
  padding: theme.spacing(1),
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

const App: React.VFC = React.memo(() => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleClickMenu = useCallback(() => {
    setOpenDrawer(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  return (
    <RecoilRoot>
      <CssBaseline />
      <AppBar position='static' open={openDrawer}>
        <Toolbar>
          <IconButton onClick={handleClickMenu}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <NoteListDrawer
        open={openDrawer}
        width={drawerWidth}
        onClose={handleCloseDrawer}
      />
      <Main open={openDrawer}>
        <div>
          <NoteEditor />
        </div>
      </Main>
    </RecoilRoot>
  );
});

App.displayName = 'App';

export default App;
