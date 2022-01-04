import React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NoteList from './NoteList';

const NoteListDrawerHeader = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export type NoteListDrawerProps = {
  open: boolean;
  width: number;

  onClose: () => void;
};

const NoteListDrawer: React.VFC<NoteListDrawerProps> = React.memo(props => {
  const { open, width, onClose } = props;

  return (
    <Drawer
      anchor='left'
      variant='persistent'
      open={open}
      sx={{
        width,
      }}
    >
      <NoteListDrawerHeader>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </NoteListDrawerHeader>
      <Divider />
      <NoteList />
    </Drawer>
  );
});

NoteListDrawer.displayName = 'NoteListDrawer';

export default NoteListDrawer;
