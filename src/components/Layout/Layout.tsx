import { useMediaQuery, SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

  const drawerStyles: SxProps<Theme> = useMemo(() => {
    return {
      transition: theme =>
        theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      ...(openDrawer && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme =>
          theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
      }),
    };
  }, [drawerWidth, openDrawer]);

  useEffect(() => {
    LocalStorage.setOpenDrawer(openDrawer, { popup });
  }, [openDrawer, popup]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        ...(popup && {
          minWidth: 750,
          minHeight: 500,
        }),
      }}
    >
      <CssBaseline />

      <LayoutHeader
        popup={popup}
        openDrawer={openDrawer}
        onOpenDrawer={handleOpenDrawer}
        sx={{
          height: headerHeight,
          ...drawerStyles,
        }}
      />

      <NoteListDrawer
        open={openDrawer}
        headerHeight={headerHeight}
        onClose={handleCloseDrawer}
        drawerProps={{
          sx: { width: drawerWidth },
        }}
        drawerHeaderProps={{
          sx: { height: headerHeight },
        }}
        listProps={{
          sx: {
            width: drawerWidth,
            height: `calc(100vh - ${headerHeight}px)`,
            overflowY: 'auto',
          },
        }}
      />

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          wordBreak: 'break-all',
          ...drawerStyles,
        }}
      >
        {children}
      </Box>
    </Box>
  );
});

LayoutContent.displayName = 'LayoutContent';
