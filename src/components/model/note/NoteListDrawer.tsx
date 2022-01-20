import React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NoteList from '@/components/model/note/NoteList';

const NoteListDrawerHeader = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export type NoteListDrawerProps = {
  open: boolean;
  headerHeight: number;
  width: number;

  onClose: () => void;
};

const NoteListDrawer: React.VFC<NoteListDrawerProps> = React.memo(props => {
  const { open, headerHeight, width, onClose } = props;

  return (
    <Drawer
      anchor='left'
      variant='persistent'
      open={open}
      sx={{
        width,
      }}
    >
      <NoteListDrawerHeader sx={{ height: headerHeight }}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </NoteListDrawerHeader>
      <Divider />
      <NoteList
        sx={{
          width,
          height: `calc(100vh - ${headerHeight}px)`,
          overflowY: 'auto',
        }}
      />
    </Drawer>
  );
});

NoteListDrawer.displayName = 'NoteListDrawer';

export default NoteListDrawer;
