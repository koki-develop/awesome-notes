import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import React, { useCallback, useEffect, useState } from 'react';
import NoteListDrawer from '@/components/model/note/NoteListDrawer';
import { LocalStorage } from '@/lib/localStorage';
import LayoutHeader from './LayoutHeader';
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

  const handleOpenDrawer = useCallback(() => {
    setOpenDrawer(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  useEffect(() => {
    LocalStorage.setOpenDrawer(openDrawer, { popup });
  }, [openDrawer, popup]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        minWidth: 750,
        minHeight: 500,
      }}
    >
      <CssBaseline />

      <LayoutHeader
        popup={popup}
        openDrawer={openDrawer}
        onOpenDrawer={handleOpenDrawer}
      />

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
          flexGrow: 1,
          overflowY: 'auto',
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
