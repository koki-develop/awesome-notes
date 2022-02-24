import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box, { BoxProps } from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import NoteList, { NoteListProps } from '@/components/model/note/NoteList';

export type NoteListDrawerProps = {
  open: boolean;
  headerHeight: number;

  onClose: () => void;

  drawerProps?: DrawerProps;
  drawerHeaderProps?: BoxProps;
  listProps?: NoteListProps;
};

const NoteListDrawer: React.VFC<NoteListDrawerProps> = React.memo(props => {
  const { open, onClose, drawerProps, drawerHeaderProps, listProps } = props;

  const theme = useTheme();

  return (
    <Drawer {...drawerProps} anchor='left' variant='persistent' open={open}>
      <Box
        {...drawerHeaderProps}
        sx={{
          alignItems: 'center',
          display: 'flex',
          padding: theme => theme.spacing(0, 1),
          ...theme.mixins.toolbar,
          justifyContent: 'flex-end',
          ...drawerHeaderProps?.sx,
        }}
      >
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <NoteList {...listProps} />
    </Drawer>
  );
});

NoteListDrawer.displayName = 'NoteListDrawer';

export default NoteListDrawer;
