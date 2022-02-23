import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { formatRelative } from 'date-fns';
import React, { useCallback, useMemo, useState } from 'react';
import {
  useDeleteNote,
  useSelectNote,
  useSelectedNote,
} from '@/hooks/noteHooks';
import { Note } from '@/models/note';

export type NoteListItemProps = {
  note: Note;
};

const NoteListItem: React.VFC<NoteListItemProps> = React.memo(props => {
  const { note } = props;

  const [deleteConfirming, setDeleteConfirming] = useState<boolean>(false);

  const selectedNote = useSelectedNote();
  const { deleteNote } = useDeleteNote();
  const { selectNote } = useSelectNote();

  const selected = useMemo(() => {
    return selectedNote?.id === note.id;
  }, [note.id, selectedNote?.id]);

  const isEmpty = useMemo(() => {
    return note.title === '';
  }, [note.title]);

  const handleClickItem = useCallback(() => {
    selectNote(note);
  }, [note, selectNote]);

  const handleClickDelete = useCallback(() => {
    selectNote(note);
    setDeleteConfirming(true);
  }, [note, selectNote]);

  const handleCloseDeleteConfirm = useCallback(() => {
    setDeleteConfirming(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    deleteNote(note.id).then(() => {
      setDeleteConfirming(false);
      if (selectedNote?.id === note.id) {
        selectNote(null);
      }
    });
  }, [deleteNote, note.id, selectNote, selectedNote?.id]);

  return (
    <>
      <Dialog open={deleteConfirming} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>
          Are you sure you want to delete this note permanently?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This operation cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            variant='contained'
            color='error'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ListItem
        disablePadding
        secondaryAction={
          <IconButton onClick={handleClickDelete}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemButton
          selected={selected}
          onClick={handleClickItem}
          sx={{ overflow: 'hidden' }}
        >
          <ListItemText
            primary={isEmpty ? 'New Note' : note.title}
            primaryTypographyProps={{
              sx: {
                color: isEmpty
                  ? theme => theme.palette.text.disabled
                  : undefined,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
            }}
            secondary={formatRelative(note.updatedAt, new Date())}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
});

NoteListItem.displayName = 'NoteListItem';

export default NoteListItem;
